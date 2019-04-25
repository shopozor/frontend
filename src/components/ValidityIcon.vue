<template>
  <transition mode="out-in" leave-active-class="animated flipOutY" enter-active-class="animated flipInY">
    <q-icon id="valid" key="valid" v-if="!knowError" name="check_circle" color="positive" />
    <q-icon id="error" key="error" v-else-if="showError" name="error" color="negative" />
    <q-icon id="mandatory" key="mandatory" v-else-if="mandatory" name="fiber_manual_record" color="ghost" />
  </transition>
</template>

<script>
export default {
  name: 'ValidityIcon',
  props: {
    mandatory: {
      type: Boolean,
      default: false
    },
    knowError: {
      type: Boolean,
      default: false
    },
    showError: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<test lang="jest">
import ValidityIcon from '../ValidityIcon'
import { mountQuasar } from '../../../test/jest/utils'

describe('Validity Icon', ()  => {
  const wrapper = mountQuasar(ValidityIcon)

  it('displays a "valid" icon if knowError: false', () => {
    wrapper.setProps({mandatory: true, knowError: false, showError: true})
    expect(wrapper.contains('#valid')).toBe(true)
    wrapper.setProps({mandatory: true, knowError: false, showError: false})
    expect(wrapper.contains('#valid')).toBe(true)
    wrapper.setProps({mandatory: false, knowError: false, showError: true})
    expect(wrapper.contains('#valid')).toBe(true)
    wrapper.setProps({mandatory: false, knowError: false, showError: false})
    expect(wrapper.contains('#valid')).toBe(true)
  })

  it('displays a "error" icon if knowError: true, showError: true', () => {
    wrapper.setProps({mandatory: true, knowError: true, showError: true})
    expect(wrapper.contains('#error')).toBe(true)
    wrapper.setProps({mandatory: false, knowError: true, showError: true})
    expect(wrapper.contains('#error')).toBe(true)
  })

  it('displays a "mandatory" icon if mandatory: true, knowError: true, showError: false', () => {
    wrapper.setProps({mandatory: true, knowError: true, showError: false})
    expect(wrapper.contains('#mandatory')).toBe(true)
  })

  it('displays nothing if mandatory: false, knowError: true, showError: false', () => {
    wrapper.setProps({mandatory: false, knowError: true, showError: false})
    expect(wrapper.contains('i')).toBe(false)
  })
})
</test>
