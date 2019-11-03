import VariantDescription from '../VariantDescription'
import { mountQuasar } from '../../../../../../../test/utils'
import types from '../../../../../../types'

const variantId = 'testId'

const priceMode = types.priceModes.FREE

const store = {
  getters: {
    editedVariantPriceMode: () => () => priceMode
  }
}

const wrapper = mountQuasar(VariantDescription, {
  shallow: true,
  propsData: {
    variantId
  },
  store
})

test('has a priceModeSelect', () => {
  const priceModeSelect = wrapper.find({ name: 'PriceModeSelect' })
  expect(priceModeSelect).toBeTruthy()
})

test('when priceMode is FREE, has a variantDescriptionFree field', () => {
  wrapper.vm.priceMode = types.priceModes.FREE
  const variantDescriptionFree = wrapper.find({ name: 'VariantDescriptionFree' })
  expect(variantDescriptionFree).toBeTruthy()
})

test('when priceMode is BULK, has a variantDescriptionBulk field', () => {
  wrapper.vm.priceMode = types.priceModes.BULK
  const variantDescriptionBulk = wrapper.find({ name: 'VariantDescriptionBulk' })
  expect(variantDescriptionBulk).toBeTruthy()
})

test('when priceMode is AUTO_PRICE, has a variantDescriptionSizeUnit field', () => {
  wrapper.vm.priceMode = types.priceModes.AUTO_PRICE
  const variantDescriptionSizeUnit = wrapper.find({ name: 'VariantDescriptionSizeUnit' })
  expect(variantDescriptionSizeUnit).toBeTruthy()
})

test('when priceMode is AUTO_PRICE, has a variantDescriptionAuto field', () => {
  wrapper.vm.priceMode = types.priceModes.AUTO_PRICE
  const variantDescriptionAuto = wrapper.find({ name: 'VariantDescriptionAuto' })
  expect(variantDescriptionAuto).toBeTruthy()
})
