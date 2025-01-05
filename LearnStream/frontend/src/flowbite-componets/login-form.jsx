import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function Component() {
  return (
    <form className="flex max-w-md flex-col gap-4">
      {/* Email Field */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
      </div>

      {/* Password Field */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required />
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="bg-[#7ED757] text-white font-medium"
      >
        Submit
      </Button>
    </form>
  );
}

export default Component;
