/**
 * Example of parsing OAS 3.0 YAML and generating OAS 3.0 YAML files.
 */
const wap = require('webapi-parser').WebApiParser
const path = require('path')

async function main () {
  // Parse OAS 3.0 YAML FILE
  const inPath = path.join(__dirname, '../api-specs/oas30/api-with-types.yaml')
  const model = await wap.oas30.parseYaml(`file://${inPath}`)

  // Get User.age property
  const age = model.declares[0].properties[2]

  // Set age minimum to 18
  age.range.withMinimum(18)

  // Set age maximum to 120
  age.range.withMaximum(120)

  // Set first endpoint path to /clients/{id}
  model.encodes.endPoints[0].withPath('/clients/{id}')

  const outPath = path.join(__dirname, './generated.yaml')
  console.log('Generating file to:', outPath)

  // Generate OAS 3.0 YAML file
  await wap.oas30.generateYamlFile(model, `file://${outPath}`)
}

main()
