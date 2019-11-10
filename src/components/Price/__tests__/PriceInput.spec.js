import PriceInput from '../PriceInput'
import { mountQuasar } from '../../../../test/utils'

describe('PriceInput', () => {
  const wrapper = mountQuasar(PriceInput, {
    shallow: true,
    propsData: {
      grossConsumerPrice: 100,
      softozorRatio: 0.04,
      rexRatio: 0.05,
      managerRatio: 0.06,
      smallestConsumerAmount: 5
    }
  })

  describe('fields selection', () => {
    beforeEach(() => {
      wrapper.setProps({
        consumer: undefined,
        producer: undefined,
        shop: undefined,
        softozor: undefined,
        rex: undefined,
        manager: undefined
      })
    })

    test('has no SinglePriceInput if all consumer, producer, shop, softozor, rex and manager prop are undefined', () => {
      const singlePriceInput = wrapper.find({ name: 'SinglePriceInput' })
      expect(singlePriceInput.exists()).toBeFalsy()
    })

    test('has a SinglePriceInput with grossConsumerPrice iif consumer prop is true', () => {
      wrapper.setProps({ consumer: true })
      const consumerSinglePriceInput = wrapper.find({ name: 'SinglePriceInput' })
      expect(consumerSinglePriceInput.attributes().value).toBe('100')
    })

    test('has a SinglePriceInput with grossProducerPrice iif producer prop is true', () => {
      wrapper.setProps({ producer: true })
      const producerSinglePriceInput = wrapper.find({ name: 'SinglePriceInput' })
      expect(producerSinglePriceInput.attributes().value).toBe('85')
    })

    test('has a SinglePriceInput with grossShopPrice iif shop prop is true', () => {
      wrapper.setProps({ shop: true })
      const shopSinglePriceInput = wrapper.find({ name: 'SinglePriceInput' })
      expect(shopSinglePriceInput.attributes().value).toBe('15')
    })

    test('has a SinglePriceInput with grossSoftozorPrice iif softozor prop is true', () => {
      wrapper.setProps({ softozor: true })
      const softozorSinglePriceInput = wrapper.find({ name: 'SinglePriceInput' })
      expect(softozorSinglePriceInput.attributes().value).toBe('4')
    })

    test('has a SinglePriceInput with grossRexPrice iif rex prop is true', () => {
      wrapper.setProps({ rex: true })
      const rexSinglePriceInput = wrapper.find({ name: 'SinglePriceInput' })
      expect(rexSinglePriceInput.attributes().value).toBe('5')
    })

    test('has a SinglePriceInput with grossManagerPrice iif manager prop is true', () => {
      wrapper.setProps({ manager: true })
      const managerSinglePriceInput = wrapper.find({ name: 'SinglePriceInput' })
      expect(managerSinglePriceInput.attributes().value).toBe('6')
    })
  })

  describe('pricing logic: the grossConsumerPrice oversees all other prices', () => {
    beforeAll(() => {
      wrapper.setProps({
        consumer: true,
        producer: true,
        shop: true,
        softozor: true,
        rex: true,
        manager: true
      })
    })

    test('after losing focus from producer field the prices are updated according to grossConsumerPrice rounded at smallestConsumerAmount', () => {
      const fields = wrapper.findAll({ name: 'SinglePriceInput' })
      const producerField = fields.at(1)
      producerField.vm.$emit('focus')
      producerField.vm.$emit('input', 99)
      producerField.vm.$emit('blur')
      expect(fields.at(0).vm.value).toBe(115)
      expect(fields.at(1).vm.value).toBe(98)
      expect(fields.at(2).vm.value).toBe(17)
      expect(fields.at(3).vm.value).toBe(5)
      expect(fields.at(4).vm.value).toBe(6)
      expect(fields.at(5).vm.value).toBe(7)
    })
  })

  describe('when the priceInput is in readonly mode', () => {
    beforeAll(() => {
      wrapper.setProps({
        consumer: true,
        producer: true,
        shop: true,
        softozor: true,
        rex: true,
        manager: true,
        readonly: true,
        grossConsumerPrice: 100
      })
    })

    test('updates all prices whenever grossConsumerPrice prop changes', () => {
      const fields = wrapper.findAll({ name: 'SinglePriceInput' })
      wrapper.setProps({ grossConsumerPrice: 200 })
      expect(fields.at(0).vm.value).toBe(200)
      expect(fields.at(1).vm.value).toBe(170)
      expect(fields.at(2).vm.value).toBe(30)
      expect(fields.at(3).vm.value).toBe(8)
      expect(fields.at(4).vm.value).toBe(10)
      expect(fields.at(5).vm.value).toBe(12)
    })
  })
})
