# Pattern: MVVM (Model–View–ViewModel)

## Definition

Model–View–ViewModel separates application data from a UI by introducing a ViewModel that exposes view-ready state and commands. The View binds to the ViewModel and reacts to state changes without knowing how the Model stores data or applies business rules.

## Structure

- `UserModel` supplies domain data through the user service contract.
- `UserViewModelState` contains DTOs and UI state such as loading and errors.
- `UserViewModel` exposes commands and subscriptions for data binding.
- A UI View can render `getState()` and subscribe to updates without calling the Model directly.

## Example

A user list screen subscribes to the ViewModel, calls `load` when mounted, and calls `selectUser` when a row is clicked. The screen only renders state; loading, selection, mapping, and error handling stay in the ViewModel.

## Trade-offs

### Advantages

- Keeps presentation logic out of UI components.
- Makes view state and user actions explicit and testable.
- Works well with reactive or data-binding UI frameworks.

### Disadvantages

- Adds a stateful abstraction for each view or feature.
- ViewModels can grow too large if they absorb domain logic.
- Subscription lifecycles must be managed to avoid stale listeners.

## Interview answer

- **Definition:** MVVM places a ViewModel between the View and Model to expose bindable state and commands.
- **Structure:** The Model owns domain data, the ViewModel prepares UI state, and the View renders and binds to it.
- **Example:** A user list ViewModel loads users, maps them to DTOs, tracks loading/errors, and handles selection.
- **Trade-off:** It improves UI testability and separation, but adds state-management complexity.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/mvvm/mvvm-pattern.ts`
- `tests/patterns/architectural/mvvm/mvvm-pattern.test.ts`
