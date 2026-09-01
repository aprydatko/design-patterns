export type UserProfile = Readonly<{
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  interests: readonly string[];
}>;

/**
 * Builder Pattern assembles a complex immutable object through readable,
 * incremental configuration.
 */
export class UserProfileBuilder {
  private username: string | undefined;
  private email: string | undefined;
  private displayName: string | undefined;
  private bio: string | undefined;
  private interests: string[] = [];

  setUsername = (username: string): this => {
    this.username = username;
    return this;
  };

  setEmail = (email: string): this => {
    this.email = email;
    return this;
  };

  setDisplayName = (displayName: string): this => {
    this.displayName = displayName;
    return this;
  };

  setBio = (bio: string): this => {
    this.bio = bio;
    return this;
  };

  addInterest = (interest: string): this => {
    this.interests.push(interest);
    return this;
  };

  build = (): UserProfile => {
    if (this.username === undefined || this.email === undefined) {
      throw new Error('Username and email are required to build a user profile');
    }

    return Object.freeze({
      username: this.username,
      email: this.email,
      displayName: this.displayName,
      bio: this.bio,
      interests: Object.freeze([...this.interests]),
    });
  };
}
