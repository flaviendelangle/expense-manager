import * as shell from 'shelljs'

shell.exec(
  "find src/config -name '*.json' -exec cp -prv '{}' 'dist/src/config' ';'"
)
shell.exec('cp -prv ./package.json dist')
