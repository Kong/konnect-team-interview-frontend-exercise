import { faker } from '@faker-js/faker'

const developerCount = 10

// Generate developers for versions
const developers = [...Array(developerCount).keys()].map(() => {
  const sex = Math.random() >= 0.95 ? 'female' : 'male'
  const firstName = faker.person.firstName(sex)
  const lastName = faker.person.lastName(sex)

  return {
    id: faker.string.uuid(),
    name: firstName + ' ' + lastName,
    email: faker.internet.email({ firstName, lastName }),
    avatar: faker.image.avatar(),
  }
})

// Get a random developer from the developers array
const getDeveloper = (): Record<string, string> => developers[faker.number.int({ min: 0, max: (developerCount - 1) })]

// NOTE: For the search functionality created in `/server/app.ts` arrays may ONLY be the value of a top-level property
const data = () => {
  const data: any = { services: [] }

  for (let i = 0; i < (Math.random() * 100) + 50; i++) {
    const published = Math.random() < 0.75
    const configured = published || Math.random() < 0.75

    data.services.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: Math.random() < 0.95 ? (Math.random() > 0.50 ? faker.commerce.productDescription() : faker.company.catchPhrase()) : '',
      type: Math.random() < 0.75 ? 'REST' : 'HTTP',
      published,
      configured,
      versions: (() => {
        const versionCount = configured ? faker.number.int({ min: published ? 1 : 0, max: 5 }) : 0

        if (versionCount === 0) return []

        return [...Array(versionCount).keys()].map(() => ({
          id: faker.string.uuid(),
          name: faker.system.semver(),
          description: Math.random() < 0.80 ? faker.company.catchPhrase() : faker.commerce.productDescription(),
          developer: published ? getDeveloper() : undefined,
          updated_at: faker.date.between({ from: new Date().setMonth((new Date().getMonth() - 6)), to: new Date().getTime() }),
        }))
      })(),
      metrics: (() => {
        if (!configured) return undefined

        return {
          latency: faker.number.float({ min: 0.3, max: 0.99, multipleOf: 0.01 }),
          uptime: faker.number.float({ min: 0.895, max: 0.998, multipleOf: 0.0001 }),
          requests: faker.number.int({ min: 800, max: 1500000 }),
          errors: faker.number.float({ min: 0.001, max: 0.089, multipleOf: 0.0001 }),
        }
      })(),
    })
  }

  return data
}

const response = data()

export default response
