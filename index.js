const os = require('os')
let impl = null

switch (os.type()) {
  case 'Darwin':
    impl = require('./impl/darwin')
    break
  case 'Linux':
    impl = require('./impl/linux')
    break
  case 'Windows_NT':
    impl = require('./impl/windows')
    break
  default:
    throw new Error('Your OS is currently not supported by node-loudness.')
}

const exportObj = {
  setVolume (volume) {
    return impl.setVolume(volume)
  },
  getVolume () {
    return impl.getVolume()
  },
  setMuted (muted) {
    return impl.setMuted(muted)
  },
  getMuted () {
    return impl.getMuted()
  }
}

if (os.type() === 'Windows_NT') {
  exportObj.setWindowsExePath = function (path) {
    impl.setWindowsExePath(path)
  }
}

module.exports = exportObj
