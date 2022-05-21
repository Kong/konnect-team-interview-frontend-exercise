const faker = require('faker')

module.exports = () => {
  const data = { service_packages: [] }

  for (let i = 0; i < (Math.random() * 100) + 50; i++) {
    data.service_packages.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      description: Math.random() < 0.96 ? faker.company.catchPhrase() + ' ' + faker.hacker.phrase() + (Math.random() < 0.2 ? ' ' + faker.hacker.phrase() : '') : '',
      enabled: faker.datatype.boolean(),
      versions: (() => {
        return [...Array(faker.datatype.number({ min: 0, max: 12 })).keys()].map(() => ({
          id: faker.datatype.uuid(),
          name: faker.commerce.department(),
          description: faker.random.words(),
        }))
      })(),
    })
  }

  return data
}
