local M = {}
local logTag = 'enhancedTrafficConfig'
local settings = require('settings')
local traffic = require('lua/ge/extensions/gameplay/traffic')

M.etcSettingsPath = settings.path...'etcModSettings.json'
M.etcCurrentSettings = jsonReadFile(M.etcSettings) or traffic.getTrafficVars()


local function loadEtcSettings()
    log('I', logTag, 'Loading last applied settings. \n Settings: '..dump(currentSettings))
    return currentSettings
end

local function saveEtcSettings(settings)
    M.etcCurrentSettings = settings
    jsonWriteFile(M.etcSettingsPath, settings, true)
end

M.loadEtcSettings = loadEtcSettings
M.saveEtcSettings = saveEtcSettings
return M
