import { config } from '@vue/test-utils'

const DataTestIdPlugin = (wrapper: any) => {
  /**
   * Find element by `data-testid` selector
   * @param {string} dataTestid The `data=testid` attribute of the element
   * @example expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
   */
  const findTestId = (dataTestid: string): any => {
    const dataSelector = `[data-testid="${dataTestid}"]`
    return wrapper.find(dataSelector)
  }

  return {
    findTestId,
  }
}

config.plugins.VueWrapper.install(DataTestIdPlugin)
