import { helpers, maxLength, minLength, required } from '@vuelidate/validators'
import { mustBeTrue, checkNumberValues } from '~/composables'

export const formRules = () => {
  const { withMessage } = helpers
  const { t } = useI18n()

  return {
    description: {
      required: withMessage(t('validations.descriptionRequired'), required),
      minLength: withMessage(t('validations.descriptionMinLength'), minLength(5)),
      maxLength: withMessage(t('validations.descriptionMaxLength'), maxLength(255)),
    },
    sendConfirmation: {
        required: withMessage(t('validations.sendConfirmationRequired'), mustBeTrue),
    },
    vat: {
        required: withMessage(t('validations.vatRequired'), required),
    },
    priceNettoEur: {
        checkNumberValues: withMessage(t('validations.priceNettoEur'), checkNumberValues)
    }
  }
}
