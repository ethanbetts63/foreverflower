# Frontend Implementation Plan

This document outlines the plan for creating the frontend for the core booking flow of Forever Flower. We will replicate the structure of `futurereminder`'s `ProfileCreationPage.tsx` and `EventGate.tsx`.

## 1. Directory Structure

We will create a new `flow` directory inside `foreverflower/frontend/src/pages` to house the components for the booking flow.

```
frontend/src/pages/flow/
├── CreateAccountPage.tsx
├── BookingWizardPage.tsx
├── BookingConfirmationPage.tsx
└── flow.css
```

## 2. Component Breakdown

### `CreateAccountPage.tsx`

This will be the first step in the user journey for new users. It will be heavily based on `futurereminder`'s `ProfileCreationPage.tsx`.

-   **State:**
    -   `isSubmitting`: `boolean`
-   **UI:**
    -   A form to capture user details (first name, last name, email, password). We'll create a `CreateAccountForm.tsx` similar to `ProfileCreationForm`.
    -   A "Next" button that submits the form.
    -   A loading spinner to indicate submission in progress.
-   **Logic:**
    -   The `handleFormSubmit` function will call a `registerUser` API function.
    -   On successful registration, it will log the user in, display a success toast, and navigate to the `BookingWizardPage`.
    -   On error, it will display an error toast with details.

### `BookingWizardPage.tsx`

This page will be a multi-step form to collect the details for the `FlowerPlan` and `Event`s.

-   **Steps:**
    1.  **Schedule:** Select dates, frequency (`times_per_year`), and duration (`number_of_years`).
    2.  **Budget:** Define the `budget_per_bouquet`.
    3.  **Recipient:** Provide recipient details (`recipient_details`).
-   **UI:**
    -   Use a stepper component to guide the user through the steps.
    -   Each step will have its own form elements.
    -   A "Next" and "Back" button to navigate between steps.
    -   A "Calculate Price" button at the end of the wizard.
-   **Logic:**
    -   The component will manage the state for all the form inputs.
    -   When "Calculate Price" is clicked, it will call a `calculatePrice` API endpoint.
    -   The calculated price will be displayed to the user for confirmation.
    -   Upon confirmation, it will create the `FlowerPlan` and associated `Event`s via an API call and then navigate to `BookingConfirmationPage`.

### `BookingConfirmationPage.tsx`

This page will display a summary of the created `FlowerPlan`.

-   **UI:**
    -   A summary of the plan details (schedule, budget, recipient).
    -   The total price.
    -   A link to the user's dashboard.

## 3. API Interaction

We will need to create the following API client functions in `foreverflower/frontend/src/api.ts`:

-   `registerUser(data)`: To create a new user.
-   `calculatePrice(data)`: To get a price estimate.
-   `createFlowerPlan(data)`: To create the flower plan and events.
-   `getFlowerPlan(id)`: To retrieve a flower plan for the confirmation page.

This plan provides a clear path forward for building the frontend of the booking flow.
