(() => {
  'use strict'

  const config = window.HOOMEE_TUJIE_CONFIG || {}
  const $ = (selector) => document.querySelector(selector)
  const $$ = (selector) => Array.from(document.querySelectorAll(selector))
  const state = { sourceType: 'link', sourceValue: '', fileName: '', quality: 'default', sessionToken: '', jobId: '', taskId: '', pollTimer: null }
  const elements = {
    input: $('#sourceInput'), fileDrop: $('#fileDrop'), fileInput: $('#fileInput'), inputLabel: $('#inputLabel'),
    inputHint: $('#inputHint'), inputCounter: $('#inputCounter'), generate: $('#generateButton'), quota: $('#quotaButton'),
    progress: $('#progressPanel'), progressTitle: $('#progressTitle'), progressPercent: $('#progressPercent'), progressBar: $('#progressBar'),
    result: $('#resultPanel'), resultImage: $('#resultImage'), resultName: $('#resultName'), resultSource: $('#resultSource'),
    download: $('#downloadButton'), toast: $('#toast'), welcome: $('#welcomeModal')
  }

  function toast(message) {
    elements.toast.textContent = message
    elements.toast.classList.add('show')
    clearTimeout(toast.timer)
    toast.timer = setTimeout(() => elements.toast.classList.remove('show'), 2600)
  }

  function updateInputState() {
    state.sourceValue = elements.input.value.trim()
    const valid = state.sourceType === 'link' ? /^https?:\/\//i.test(state.sourceValue) : state.sourceValue.length >= 20
    elements.generate.disabled = !valid
    elements.inputCounter.textContent = state.sourceType === 'link' ? (valid ? '链接有效' : '0') : `${state.sourceValue.length} 字`
  }

  function selectSource(type) {
    state.sourceType = type
    state.sourceValue = ''
    state.fileName = ''
    elements.input.value = ''
    $$('.source-tab').forEach((button) => button.classList.toggle('active', button.dataset.source === type))
    const labels = { link: '文章链接', text: '文章正文', file: '上传文件' }
    const placeholders = { link: '粘贴公众号或网页链接', text: '粘贴文章完整正文，建议不少于 200 字', file: '' }
    elements.inputLabel.textContent = labels[type]
    elements.input.placeholder = placeholders[type]
    elements.input.classList.toggle('hidden', type === 'file')
    elements.fileDrop.classList.toggle('hidden', type !== 'file')
    elements.inputHint.textContent = type === 'link'
      ? '抓取失败时，可以切换为“粘贴正文”或上传文件'
      : type === 'text' ? '系统将提取事实、数字和内容逻辑用于视觉生成' : '支持不超过 5MB 的 TXT 或 Markdown 文件'
    updateInputState()
  }

  async function apiRequest(path, options = {}) {
    if (!config.apiBaseUrl) throw new Error('网页生成服务正在配置中')
    const response = await fetch(`${config.apiBaseUrl}${path}`, {
      method: options.method || 'GET',
      headers: { 'content-type': 'application/json', ...(state.sessionToken ? { authorization: `Bearer ${state.sessionToken}` } : {}) },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'omit'
    })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(payload.message || '网页生成服务暂不可用')
    if (payload.token) {
      state.sessionToken = payload.token
      localStorage.setItem('hoomee_tujie_token', payload.token)
    }
    return payload.data === undefined ? payload : payload.data
  }

  async function initWebApi() {
    state.sessionToken = localStorage.getItem('hoomee_tujie_token') || ''
    if (!state.sessionToken) await apiRequest('/v1/session', { method: 'POST', body: {} })
    await loadQuota()
  }

  async function loadQuota() {
    try {
      const quota = await apiRequest('/v1/quota')
      if (quota.unlimited) elements.quota.textContent = '开发者 · 不限次数'
      else elements.quota.textContent = quota.remaining > 0 ? `今日剩余 ${quota.remaining} 次` : '今日次数已用完'
      if (!quota.unlimited && quota.remaining <= 0) elements.generate.disabled = true
    } catch (error) {
      elements.quota.textContent = '每天免费 1 次'
    }
  }

  function compactContent(value, max = 5600) {
    return String(value || '').replace(/\r/g, '').replace(/\n{3,}/g, '\n\n').trim().slice(0, max)
  }

  function buildVisualPrompt(content, meta = {}) {
    const sourceLabel = meta.title ? `文章标题：${meta.title}` : '文章标题：请从正文准确提炼'
    return [
      'Use case: infographic-diagram',
      '生成一张 premium vertical Chinese strategy-report long infographic poster，适合手机纵向滚动阅读。',
      '这是一张最终竖版长图，不是网页截图。高端演示文稿拼贴，电影感 AI 位图视觉。',
      '视觉主题：深海蓝白。Apple Keynote 洁净感、企业蓝白报告清晰度、电影感图像叙事。',
      sourceLabel,
      meta.author ? `作者：${meta.author}` : '',
      meta.publishDate ? `发布日期：${meta.publishDate}` : '',
      '请先理解以下原文，再提取核心判断、关键事实、人物机构、日期、比例、金额、比较对象、时间线、风险和结论，组织成完整视觉叙事。',
      '结构建议：Hero 封面；核心判断；关键机制；数据证据；重要对比；时间线或路径；现实影响；最终结论。根据内容自然增减中间段。',
      '数字零容忍：逐字保留原文数值、日期、比例、金额、排名、比较对象与单位，不得估算、反转或虚构。',
      '使用更少的小标签、更大的可读中文、现代非衬线正文、大号数字、准确单位和充足留白。避免微小文字、乱码、长段落、密集卡片、廉价图标、卡通、假 UI 和水印。',
      '每个中间内容段尽量等高；不要出现 1/2/3、01/02/03 形式的章节编号。',
      '最底部保留全宽、细长、纯白、完全空白的来源栏；不要在白栏或主体生成二维码、Logo、HooMee、署名或水印。',
      '原文：',
      compactContent(content)
    ].filter(Boolean).join('\n').slice(0, 7000)
  }

  function setStage(index, percent, title) {
    elements.progressTitle.textContent = title
    elements.progressPercent.textContent = `${percent}%`
    elements.progressBar.style.width = `${percent}%`
    $$('.stage').forEach((stage, stageIndex) => {
      stage.classList.toggle('active', stageIndex === index)
      stage.classList.toggle('done', stageIndex < index)
    })
  }

  async function resolveSource() {
    if (state.sourceType !== 'link') return { content: state.sourceValue, sourceUrl: '' }
    setStage(0, 14, '正在读取文章内容')
    const article = await apiRequest('/v1/articles/extract', { method: 'POST', body: { url: state.sourceValue } })
    if (!article || !article.content || article.content.length < 80) throw new Error('未能读取足够的正文，请切换为粘贴正文')
    return { content: article.content, sourceUrl: article.finalUrl || state.sourceValue, meta: article }
  }

  async function createTask() {
    if (elements.generate.disabled) return
    elements.generate.disabled = true
    elements.result.classList.add('hidden')
    elements.progress.classList.remove('hidden')
    elements.progress.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setStage(0, 8, '正在理解文章')
    try {
      const source = await resolveSource()
      setStage(1, 27, '正在组织视觉简报')
      const prompt = buildVisualPrompt(source.content, source.meta || {})
      state.taskId = `web_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      const job = await apiRequest('/v1/jobs', { method: 'POST', body: { taskId: state.taskId, prompt, sourceUrl: source.sourceUrl || '', quality: state.quality } })
      state.jobId = job.jobId
      localStorage.setItem('hoomee_tujie_active_job', JSON.stringify({ jobId: state.jobId, taskId: state.taskId, sourceType: state.sourceType, createdAt: Date.now() }))
      setStage(2, 48, '正在生成视觉页面')
      await pollJob()
    } catch (error) {
      elements.generate.disabled = false
      elements.progress.classList.add('hidden')
      toast(error.message || '生成任务提交失败，请稍后重试')
    }
  }

  async function pollJob() {
    const startedAt = Date.now()
    while (Date.now() - startedAt < 8 * 60 * 1000) {
      await new Promise((resolve) => setTimeout(resolve, 4500))
      try {
        const job = await apiRequest(`/v1/jobs/${encodeURIComponent(state.jobId)}`)
        const elapsed = Date.now() - startedAt
        if (job.status === 'completed' && job.result) return showResult(job.result)
        if (job.status === 'failed') throw new Error(job.errorMessage || '图片暂未生成成功，请稍后重试')
        if (elapsed > 65000) setStage(3, Math.min(92, 72 + Math.floor(elapsed / 9000)), '正在完成高清交付')
        else setStage(2, Math.min(70, 48 + Math.floor(elapsed / 3500)), '正在生成视觉页面')
      } catch (error) {
        if (/暂未生成|已用完|不存在/.test(error.message || '')) throw error
      }
    }
    throw new Error('生成时间较长，任务仍在后台继续。请稍后刷新页面查看。')
  }

  async function resolveFileUrl(fileID) {
    if (!fileID) return ''
    if (/^https?:\/\//i.test(fileID)) return fileID
    try {
      const result = await apiRequest('/v1/files/url', { method: 'POST', body: { fileID } })
      return result.url || fileID
    } catch (_) { return fileID }
  }

  async function showResult(result) {
    setStage(3, 100, '高清长图已经完成')
    const url = await resolveFileUrl(result.fileID)
    elements.resultImage.src = url
    elements.download.href = url
    elements.resultSource.textContent = state.sourceType === 'link' ? '网页链接' : state.sourceType === 'file' ? '上传文件' : '粘贴正文'
    elements.resultName.textContent = state.fileName || 'HooMee 图解作品'
    localStorage.removeItem('hoomee_tujie_active_job')
    setTimeout(() => {
      elements.progress.classList.add('hidden')
      elements.result.classList.remove('hidden')
      elements.result.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 500)
    loadQuota()
  }

  function resetTask() {
    clearTimeout(state.pollTimer)
    state.jobId = ''
    state.taskId = ''
    localStorage.removeItem('hoomee_tujie_active_job')
    elements.result.classList.add('hidden')
    elements.progress.classList.add('hidden')
    selectSource('link')
    $('#create').scrollIntoView({ behavior: 'smooth' })
  }

  async function resumeJob() {
    try {
      const saved = JSON.parse(localStorage.getItem('hoomee_tujie_active_job') || 'null')
      if (!saved || !saved.jobId || Date.now() - saved.createdAt > 10 * 60 * 1000) return
      state.jobId = saved.jobId
      state.taskId = saved.taskId
      state.sourceType = saved.sourceType || 'link'
      elements.progress.classList.remove('hidden')
      setStage(2, 58, '正在恢复后台生成任务')
      await pollJob()
    } catch (_) { localStorage.removeItem('hoomee_tujie_active_job') }
  }

  $$('.source-tab').forEach((button) => button.addEventListener('click', () => selectSource(button.dataset.source)))
  elements.input.addEventListener('input', updateInputState)
  elements.fileInput.addEventListener('change', async (event) => {
    const file = event.target.files && event.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) return toast('文件不能超过 5MB')
    state.fileName = file.name
    elements.input.value = await file.text()
    state.sourceValue = elements.input.value.trim()
    elements.inputLabel.textContent = file.name
    elements.inputCounter.textContent = `${state.sourceValue.length} 字`
    elements.generate.disabled = state.sourceValue.length < 20
    elements.fileDrop.querySelector('strong').textContent = file.name
  })
  $$('.locked').forEach((button) => button.addEventListener('click', () => toast('该选项敬请期待')))
  elements.generate.addEventListener('click', createTask)
  $('#newTaskButton').addEventListener('click', resetTask)
  $('#welcomeButton').addEventListener('click', () => {
    elements.welcome.classList.add('hidden')
    localStorage.setItem('hoomee_tujie_welcome_seen', '1')
  })

  if (!localStorage.getItem('hoomee_tujie_welcome_seen')) elements.welcome.classList.remove('hidden')
  selectSource('link')
  initWebApi().then(resumeJob).catch(() => { elements.quota.textContent = '网页服务配置中' })
})()
