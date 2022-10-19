<template>
  <form
    id="form"
    name="form"
    @submit.prevent="handleSubmit()"
    @invalid.capture.prevent="handleInvalid()"
    class="form-container"
  >
    <!-- DESCRIPTION -->
    <div class="input--container">
      <label for="description" class="input--label">{{
        t("inputs.description")
      }}</label>
      <div class="textarea-form-container">
        <textarea
          id="description"
          v-model="v$.description.$model"
          name="descriptionInput"
          autocomplete="do-not-autocomplete"
          class="textarea"
          :placeholder="t('inputs.enterDescription')"
          :class="{ 'input--invalid': v$.description.$error }"
          required
          minlength="5"
          @input="
            countDescription($event);
            v$.description.$touch();
          "
        />
        <!-- <div> -->
        <span
          class="text-bold description-counter"
          :class="checkDescriptionCounterColor()"
          >{{ descriptionCounter }} / 255</span
        >
        <!-- </div> -->
        <FormValidationIcon
          :success="v$.description.$dirty && !v$.description.$error"
          :error="v$.description.$error"
          type="description"
          @clear-error="handleClearError"
        />
        <FormValidationMessage
          v-if="v$.description.$error"
          id="descriptionValidation"
        >
          <span
            v-for="error in v$.description.$errors"
            id="descriptionValidation.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}</span
          >
        </FormValidationMessage>
      </div>
    </div>

    <!-- CONFIRMATION -->
    <div class="input--container">
      <div class="input--label">Confirmation</div>
      <div class="radio-control-container">
        <label for="sendConfirmationOption1" class="control">
          <input
            id="sendConfirmationOption1"
            v-model.lazy="state.sendConfirmation"
            type="radio"
            :value="true"
            required
          />
          <div class="control__indicator control__indicator--radio" />
          <span class="radio-control-container__label">
            {{ sendConfirmationOptions[0] }}
          </span>
        </label>

        <label for="sendConfirmationOption2" class="control">
          <input
            id="sendConfirmationOption2"
            v-model.lazy="state.sendConfirmation"
            type="radio"
            :value="false"
            required
          />
          <div class="control__indicator control__indicator--radio" />
          <span class="radio-control-container__label">
            {{ sendConfirmationOptions[1] }}
          </span>
        </label>
      </div>
      <FormValidationMessage
        v-if="submitted && v$.sendConfirmation.$error"
        class="margin-top-1"
      >
        <span
          v-for="error in v$.sendConfirmation.$errors"
          id="sendConfirmation.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </FormValidationMessage>
    </div>

    <!-- VAT -->
    <div class="input--container">
      <label for="vat" class="input--label margin-bottom-2">{{ t("inputs.vat") }}</label>
      <div class="select-form-container">
        <multiselect
          id="vat"
          v-model.lazy="state.vat"
          name="vatInput"
          autocomplete="do-not-autocomplete"
          class=""
          :placeholder="t('inputs.chooseVat')"
          :class="{ 'input--invalid': submitted && v$.vat.$error }"
          required
          :options="vatOptions"
          :searchable="false"
          :multiple="false"
          :allow-empty="true"
          :show-labels="true"
          select-label=""
          deselect-label="&#x2716;"
          selected-label="&#x2714;"
          :preserve-search="true"
          @blur="v$.vat.$touch()"
        >
          <template #caret>
          <img src="@/assets/img/icons/chevron-down.svg?url" class="multiselect__select" alt="chevron-down">
        </template>
        </multiselect>
        <FormValidationIcon
          :success="v$.vat.$dirty && !v$.vat.$error"
          :error="submitted && v$.vat.$error"
          type="vat"
          @clear-error="handleClearError"
        />
        <FormValidationMessage
          v-if="submitted && v$.vat.$error"
          id="vatValidation"
        >
          <span
            v-for="error in v$.vat.$errors"
            id="vatValidation.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}</span
          >
        </FormValidationMessage>
      </div>
    </div>

    <!-- PRICE NETTO EUR -->
    <div class="input--container">
      <label for="priceNettoEur" class="input--label">{{
        t("inputs.priceNettoEur")
      }}</label>
      <div class="input-form-container">
        <input
          id="priceNettoEur"
          v-model="v$.priceNettoEur.$model"
          name="priceNettoEurInput"
          autocomplete="do-not-autocomplete"
          class="input input--fluid"
          :placeholder="t('inputs.enterPriceNettoEur')"
          :class="{ 'input--invalid': v$.priceNettoEur.$error }"
          required
          minlength="2"
          maxlength="50"
          :disabled="priceNettoEurDisabled"
          @input="v$.priceNettoEur.$touch()"
        />
        <FormValidationIcon
          :success="v$.priceNettoEur.$dirty && !v$.priceNettoEur.$error"
          :error="v$.priceNettoEur.$error"
          type="priceNettoEur"
          @clear-error="handleClearError"
        />
        <FormValidationMessage
          v-if="v$.priceNettoEur.$error"
          id="priceNettoEurValidation"
        >
          <span
            v-for="error in v$.priceNettoEur.$errors"
            id="priceNettoEurValidation.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}</span
          >
        </FormValidationMessage>
      </div>
    </div>

    <!-- PRICE BRUTTO EUR -->
    <div class="input--container">
      <label for="priceBruttoEur" class="input--label">{{
        t("inputs.priceBruttoEur")
      }}</label>
      <div class="input-form-container">
        <input
          id="priceBruttoEur"
          v-model="state.priceBruttoEur"
          name="priceBruttoEurInput"
          autocomplete="do-not-autocomplete"
          class="input input--fluid"
          :placeholder="t('inputs.enterPriceBruttoEur')"
          disabled
          readonly
        />
      </div>
    </div>

    <!-- SUBMIT -->
    <button
      class="button button--primary button--radius"
      type="submit"
      @click="submit"
    >
      <span class="text-bold">{{ t("button.submit") }}</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { formRules } from "./FormRules";
import useVuelidate from "@vuelidate/core";
import { useClearError } from "@/composables";
import axios from "axios";
import type { FormData } from "~/store/form";

const { t } = useI18n();
const state = reactive<FormData>({
  description: null,
  sendConfirmation: null,
  vat: null,
  priceNettoEur: null,
  priceBruttoEur: null,
});
const emit = defineEmits(["success"]);

const sendConfirmationOptions = ["Yes", "No"];
const vatOptions = ["19%", "21%", "23%", "25%"];
const priceNettoEurDisabled = ref(true);

const toDecimal = (percent) => {
  return parseFloat(percent) / 100;
};

const calculatePriceBruttoEur = () => {
  if (state.vat && state.priceNettoEur) {
    const vatDecimal = toDecimal(state.vat);
    const priceNettoEur = parseFloat(state.priceNettoEur);
    state.priceBruttoEur = (priceNettoEur + vatDecimal * priceNettoEur).toFixed(2);
  } else {
      state.priceBruttoEur = null
  }
};

watch(
  () => state.vat,
  (nV, oV) => {
    if (nV !== null) {
      priceNettoEurDisabled.value = false;
      calculatePriceBruttoEur();
    } else {
      priceNettoEurDisabled.value = true;
      state.priceNettoEur = null;
      state.priceBruttoEur = null;
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => state.priceNettoEur,
  (nV, oV) => {
    if (nV && !isNaN(parseFloat(nV))) {
      calculatePriceBruttoEur();
    } else {
      state.priceBruttoEur = null;
    }
  },
  { immediate: true, deep: true }
);

const submitted = ref(false);
const departmentRef = ref();
const currencyRef = ref();

const v$ = useVuelidate(formRules, state, { $autoDirty: true });

const descriptionCounter = ref(0);

const countDescription = (e) => {
  descriptionCounter.value = e.target.value.length;
};

const checkDescriptionCounterColor = () => {
  if (descriptionCounter.value <= 4 && v$.value.description.$dirty) {
    return "input--invalid";
  } else if (descriptionCounter.value > 255) {
    return "input--invalid";
  } else if (
    descriptionCounter.value >= 200 &&
    descriptionCounter.value <= 255
  ) {
    return "input--warning";
  } else if (descriptionCounter.value >= 5 && descriptionCounter.value <= 199) {
    return "input--success-2";
  }
};

const handleClearError = (args) => {
  useClearError(args, state, v$, true);
  if (args.type === "description") {
    descriptionCounter.value = 0;
  }
};

const handleInvalid = () => {
  console.error("invalid data");
  submitted.value = true;
  v$.value.$touch();
};

const handleSubmit = async () => {
  submitted.value = true;
  const validation = await v$.value.$validate();

  if (!validation) {
    handleInvalid();
  } else {
   const res = await axios
      .post("/api/form", {
        description: state.description,
        sendConfirmation: state.sendConfirmation,
        vat: state.vat,
        priceNettoEur: state.priceNettoEur,
        priceBruttoEur: state.priceBruttoEur,
      })
      .then(() => {
        emit("success", true);
      })
      .catch((err) => {
        console.error(err);
        handleInvalid();
      });
  }
};
</script>