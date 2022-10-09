# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.5.1](https://github.com/capawesome-team/capacitor-file-picker/compare/v0.5.0...v0.5.1) (2022-10-09)


### Bug Fixes

* **android:** base64 encoded data contains line breaks ([#49](https://github.com/capawesome-team/capacitor-file-picker/issues/49)) ([953d92a](https://github.com/capawesome-team/capacitor-file-picker/commit/953d92a956c2f13d05ba6f39f39277894544a54b))

## [0.5.0](https://github.com/capawesome-team/capacitor-file-picker/compare/v0.4.0...v0.5.0) (2022-09-04)


### ⚠ BREAKING CHANGES

* set default value of `readData` to `false` (#43)

* set default value of `readData` to `false` ([#43](https://github.com/capawesome-team/capacitor-file-picker/issues/43)) ([6100f00](https://github.com/capawesome-team/capacitor-file-picker/commit/6100f0046328c6e395cf120d2ce4fca3ce586355))

## [0.4.0](https://github.com/capawesome-team/capacitor-file-picker/compare/v0.3.1...v0.4.0) (2022-08-04)


### ⚠ BREAKING CHANGES

* This plugin was renamed to `@capawesome/capacitor-file-picker`. Please install the new npm package and run `npx cap sync`.
* This plugin now only supports Capacitor 4.

### Features

* update to Capacitor 4 ([#39](https://github.com/capawesome-team/capacitor-file-picker/issues/39)) ([ca8caf5](https://github.com/capawesome-team/capacitor-file-picker/commit/ca8caf53fcac91fe74b6e25e2044eb0aaf40c42c))


* rename to `@capawesome/capacitor-file-picker` ([#40](https://github.com/capawesome-team/capacitor-file-picker/issues/40)) ([d7d0bbe](https://github.com/capawesome-team/capacitor-file-picker/commit/d7d0bbe515a54169c3ef07c3832febd4773e2204))

### [0.3.1](https://github.com/robingenz/capacitor-file-picker/compare/v0.3.0...v0.3.1) (2022-07-13)


### Features

* **web:** provide `Blob` instance ([#37](https://github.com/robingenz/capacitor-file-picker/issues/37)) ([e84bcf9](https://github.com/robingenz/capacitor-file-picker/commit/e84bcf9a3c9f6cb309d18c36e1fcf918f8ec822a))


### Bug Fixes

* **android:** map `text/csv` to `text/comma-separated-values` ([#36](https://github.com/robingenz/capacitor-file-picker/issues/36)) ([87b82f6](https://github.com/robingenz/capacitor-file-picker/commit/87b82f67518189041c7ea237eb6717f94c67d320))

## [0.3.0](https://github.com/robingenz/capacitor-file-picker/compare/v0.2.3...v0.3.0) (2022-02-23)


### ⚠ BREAKING CHANGES

* Property `data` of `File` is now optional

### Features

* add `readData` option ([#23](https://github.com/robingenz/capacitor-file-picker/issues/23)) ([ed29f2e](https://github.com/robingenz/capacitor-file-picker/commit/ed29f2e61b70a95a09e2d9e237b7005b97a2d38b))

### [0.2.3](https://github.com/robingenz/capacitor-file-picker/compare/v0.2.2...v0.2.3) (2022-01-26)


### Bug Fixes

* inline source code in esm map files ([41952b2](https://github.com/robingenz/capacitor-file-picker/commit/41952b26a6c82cca3f7061fe630e0413a781fff1))

### [0.2.2](https://github.com/robingenz/capacitor-file-picker/compare/v0.2.1...v0.2.2) (2021-11-22)


### Bug Fixes

* **android:** add fallback for file name ([#20](https://github.com/robingenz/capacitor-file-picker/issues/20)) ([96fc1e6](https://github.com/robingenz/capacitor-file-picker/commit/96fc1e679588b251e7b5151e924f800f182ca500))

### [0.2.1](https://github.com/robingenz/capacitor-file-picker/compare/v0.2.0...v0.2.1) (2021-10-31)


### Bug Fixes

* **android:** local files are not shown with empty `types` array ([#18](https://github.com/robingenz/capacitor-file-picker/issues/18)) ([fc2c6aa](https://github.com/robingenz/capacitor-file-picker/commit/fc2c6aac005aa8170346fb008f47fa769f515eb1))
* **web:** increase timeout to detect `cancel` ([#19](https://github.com/robingenz/capacitor-file-picker/issues/19)) ([d03c001](https://github.com/robingenz/capacitor-file-picker/commit/d03c001af8825f7a5aa50ba1d08324340d476abe))

## [0.2.0](https://github.com/robingenz/capacitor-file-picker/compare/v0.1.3...v0.2.0) (2021-10-02)


### ⚠ BREAKING CHANGES

* Method `pickFile` is replaced by `pickFiles`

### Features

* support for multiple file selection ([#14](https://github.com/robingenz/capacitor-file-picker/issues/14)) ([ea7f055](https://github.com/robingenz/capacitor-file-picker/commit/ea7f055d6a359629fc2476f50334f9d27431ffed))

### [0.1.3](https://github.com/robingenz/capacitor-file-picker/compare/v0.1.2...v0.1.3) (2021-10-01)


### Bug Fixes

* local files are not shown ([0115e2b](https://github.com/robingenz/capacitor-file-picker/commit/0115e2bd9da125bf3ad5ea67450b2d5d5b05b7e7))

### [0.1.2](https://github.com/robingenz/capacitor-file-picker/compare/v0.1.1...v0.1.2) (2021-08-29)


### Features

* implement `types` option ([#10](https://github.com/robingenz/capacitor-file-picker/issues/10)) ([176dced](https://github.com/robingenz/capacitor-file-picker/commit/176dcedb00e6008da4d6ac357b1c216194bc9217))


### Bug Fixes

* **ios:** document picker swipe down not handled ([#11](https://github.com/robingenz/capacitor-file-picker/issues/11)) ([ed13fee](https://github.com/robingenz/capacitor-file-picker/commit/ed13feeae0590d75c76e0e0ec979ea297733cfcf))

### [0.1.1](https://github.com/robingenz/capacitor-file-picker/compare/v0.1.0...v0.1.1) (2021-08-29)


### Features

* add `web` support ([#9](https://github.com/robingenz/capacitor-file-picker/issues/9)) ([23e5bf6](https://github.com/robingenz/capacitor-file-picker/commit/23e5bf6a065cb33dd1547a4f9b04666c32029c06))

## 0.1.0 (2021-08-15)

Initial release 🎉
