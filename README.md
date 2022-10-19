# This is recruitment task project (form).

## About project:
- This is a form with dynamically validation and mock server.
- You need to enter some data in form elements like:
    - 1. Description (textarea, 5-255 chars, with displayed counter and validation errors in real time),
    - 2. Confirmation (radio button, YES/NO, validation after clicking 'submit button'),
    - 3. VAT (select, 4choices, validation after clicking 'submit'),
    - 4. Price netto EUR (input, disabled till VAT isn't chosen, only float numbers - validation if user types bad input in real time),
    - 5. Price brutto EUR (input, always disabled - readonly, calclulated automatically when the price netto and VAT is changed),
    - 6. Submit button for validation and submiting the form data to mock server api. When the data is good, then will be congratulation block displayed instead of a form.

There is also a hidden / not used feature (maybe for future use or demo/presentation purposes), typed in TS store with formData object with setter and getter, and configured with plugin to persist state after the refresh in browser.

## Technologies:
- Vite
- Vitesse (Vite Starter)
- Vue3 (JS)
- Vuelidate
- Pinia as Vue3 state management

## How to Run locally:
- Clone this repository, then unzip contents in #yours_folder (whetever you want and you know)
- cd #yours_folder
- run command 'npm install' (or pnpm install if you have, I suggest this, it's faster than normal npm - 'npm install -g pnpm')
- wait for finish install and run the command 'npm run dev' ('pnpm run dev')
- the application should be available on http://localhost:3333/

## Cypress integration tests
(optional) there is a bonus feature - cypress integration test which fill the data of form automatically and compares the results. 

To run the cypress tests, go to terminal with root project path and type: './node_modules/.bin/cypress open'


Krzysztof Meyer @2022.