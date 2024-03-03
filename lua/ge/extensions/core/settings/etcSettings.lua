local M = {}
M.dependencies = { 'gameplay_traffic' }
local logTag = 'enhancedTrafficConfig'

M.etcSettingsPath = '/settings/etcModSettings.json'
M.etcCurrentSettings = jsonReadFile(M.etcSettingsPath) or extensions.gameplay_traffic.getTrafficVars()


local function loadEtcSettings()
    log('I', logTag, 'Loading last applied settings. \n Settings: '..dumps(M.etcCurrentSettings))
    return M.etcCurrentSettings
end

local function saveEtcSettings(settings)
    M.etcCurrentSettings = settings
    jsonWriteFile(M.etcSettingsPath, settings, true)
end

M.loadEtcSettings = loadEtcSettings
M.saveEtcSettings = saveEtcSettings
return M
