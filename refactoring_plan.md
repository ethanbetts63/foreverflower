# Refactoring Plan: Eliminating `source` Parameter and Separating Flow/Dashboard Pages

This plan outlines the steps to refactor the frontend codebase to eliminate the `source=management` parameter and create distinct pages for plan creation (under `frontend/src/pages/flow`) and plan editing/management (under `frontend/src/pages/user_dashboard`).

---

## 1. Create `frontend/src/pages/user_dashboard/EditPreferencesPage.tsx`

*   **Action:** Create a new file at `frontend/src/pages/user_dashboard/EditPreferencesPage.tsx`.
*   **Content:** Copy the entire content from `frontend/src/pages/flow/Step3PreferenceSelectionPage.tsx` into this new file.
*   **Modifications within `EditPreferencesPage.tsx`:**
    *   **Imports:** Remove `useLocation` as the `source` parameter will no longer be used.
    *   **`isManagementFlow` and `redirectPath` / `backPath` / `saveButtonText`:** Remove these variables and their conditional assignments. Hard-code the values for the editing context:
        *   `redirectPath`: `/dashboard/plans/${planId}/overview`
        *   `backPath`: `/dashboard/plans/${planId}/overview`
        *   `saveButtonText`: "Save Changes"
        *   The `Seo` title should be updated to "Edit Preferences | ForeverFlower".
    *   **`handleSkip` function:** This function is not relevant in an editing context where the user has explicitly chosen to edit preferences. It should be removed. The corresponding skip button in the JSX should also be removed.
    *   **`BackButton` component:** The `to` prop for `BackButton` should directly use the hard-coded `backPath` (`/dashboard/plans/${planId}/overview`).

## 2. Modify `frontend/src/pages/flow/Step3PreferenceSelectionPage.tsx`

*   **Action:** Modify the existing file `frontend/src/pages/flow/Step3PreferenceSelectionPage.tsx`.
*   **Modifications within `Step3PreferenceSelectionPage.tsx`:**
    *   **Imports:** Remove `useLocation`.
    *   **`isManagementFlow` and `redirectPath` / `backPath` / `saveButtonText`:** Remove these variables and their conditional assignments. Hard-code the values for the creation context:
        *   `redirectPath`: `/book-flow/flower-plan/${planId}/add-message`
        *   `backPath`: `/book-flow/flower-plan/${planId}/structure`
        *   `saveButtonText`: "Save & Continue"
        *   The `Seo` title should remain "Select Preferences | ForeverFlower".
    *   **`handleSkip` function:** This function and its associated button should remain, as skipping preferences is an option during initial plan creation.
    *   **`BackButton` component:** The `to` prop for `BackButton` should directly use the hard-coded `backPath`.

## 3. Create `frontend/src/pages/user_dashboard/EditMessagesPage.tsx`

*   **Action:** Create a new file at `frontend/src/pages/user_dashboard/EditMessagesPage.tsx`.
*   **Content:** Copy the entire content from `frontend/src/pages/flow/Step4CustomMessagePage.tsx` into this new file.
*   **Modifications within `EditMessagesPage.tsx`:**
    *   **Imports:** Remove `useLocation`.
    *   **`isManagementFlow` and `redirectPath` / `saveButtonText`:** Remove these variables and their conditional assignments. Hard-code the values for the editing context:
        *   `redirectPath`: `/dashboard/plans/${planId}/overview`
        *   `saveButtonText`: "Save Changes"
        *   The `Seo` title should be updated to "Edit Custom Messages | ForeverFlower".
    *   **`handleSkip` function:** Remove this function and its associated button from the JSX.
    *   **`BackButton` component:** The `to` prop for `BackButton` should directly use the hard-coded `redirectPath` (`/dashboard/plans/${planId}/overview`).

## 4. Modify `frontend/src/pages/flow/Step4CustomMessagePage.tsx`

*   **Action:** Modify the existing file `frontend/src/pages/flow/Step4CustomMessagePage.tsx`.
*   **Modifications within `Step4CustomMessagePage.tsx`:**
    *   **Imports:** Remove `useLocation`.
    *   **`isManagementFlow` and `redirectPath` / `saveButtonText`:** Remove these variables and their conditional assignments. Hard-code the values for the creation context:
        *   `redirectPath`: `/book-flow/flower-plan/${planId}/confirmation`
        *   `saveButtonText`: "Next"
        *   The `Seo` title should remain "Add Custom Messages | ForeverFlower".
    *   **`handleSkip` function:** This function and its associated button should remain.
    *   **`BackButton` component:** The `to` prop for `BackButton` should be hardcoded to the previous step in the flow, which is `/book-flow/flower-plan/${planId}/preferences`.

## 5. Update `frontend/src/App.tsx`

*   **Action:** Modify the existing file `frontend/src/App.tsx`.
*   **Modifications within `App.tsx`:**
    *   **Imports:** Add lazy imports for the new `EditPreferencesPage` and `EditMessagesPage`.
        ```typescript
        const EditPreferencesPage = lazy(() => import('./pages/user_dashboard/EditPreferencesPage'));
        const EditMessagesPage = lazy(() => import('./pages/user_dashboard/EditMessagesPage'));
        ```
    *   **Routes:** Add new routes for the editing pages under the `UserDashboardLayout`'s children routes:
        ```typescript
        // Existing Dashboard routes
        <Route path="/dashboard" element={<UserDashboardLayout />}>
          // ... existing routes ...
          <Route path="plans/:planId/edit-preferences" element={<EditPreferencesPage />} />
          <Route path="plans/:planId/edit-messages" element={<EditMessagesPage />} />
        </Route>
        ```
    *   **Existing Routes (where `editUrl` is used):**
        *   The `editUrl` props passed to `PreferencesCard` and `MessagesCard` (e.g., in `BookingConfirmationPage.tsx` and `PlanOverviewPage.tsx`) will need to be updated to point to these new, dedicated editing routes. This change will be handled in the subsequent steps after the pages are created and modified.

---
