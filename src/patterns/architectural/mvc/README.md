# Pattern: MVC (Model–View–Controller)

## Definition

Model–View–Controller separates application data and behavior from presentation and request coordination. The Model owns the data, the View renders it, and the Controller receives an action, asks the Model for what it needs, and chooses the View response.

## Structure

- `UserModel` supplies user data and application behavior through the service contract.
- `UserView` owns the response format and status codes.
- `UserController` coordinates model lookups and view rendering.
- `createJsonUserView` is a concrete View that renders DTOs as JSON.

## Example

An HTTP route can call `UserController.showProfile` for a user request. The controller does not query the repository or construct JSON; it delegates data access to the Model and presentation to the View.

## Trade-offs

### Advantages

- Separates data, presentation, and request coordination.
- Allows views to change without rewriting model behavior.
- Keeps controllers small and straightforward to test.

### Disadvantages

- Adds multiple boundaries for simple features.
- Controllers can become bloated if they contain business rules.
- In larger applications, “Model” may need further separation into services and repositories.

## Interview answer

- **Definition:** MVC separates Model data, View presentation, and Controller request coordination.
- **Structure:** A Controller receives an action, uses the Model, and delegates output to a View.
- **Example:** A profile controller asks a user service for a user and returns a JSON view.
- **Trade-off:** It improves separation and testability, but adds indirection and requires disciplined boundaries.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/mvc/mvc-pattern.ts`
- `tests/patterns/architectural/mvc/mvc-pattern.test.ts`
