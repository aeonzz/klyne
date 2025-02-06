import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth-client";
import React from "react";
import { useForm } from "react-hook-form";
import { signinCredential, type SigninCredential } from "./_lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Github, Loader2 } from "lucide-react";

export default function SignIn() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<SigninCredential>({
    resolver: zodResolver(signinCredential),
  });

  const onSubmit = async (values: SigninCredential) => {
    try {
      const { email, password } = values;
      await signUp.email({
        email: email,
        password: password,
        name: "christian",
        fetchOptions: {
          onRequest: () => {
            setIsLoading(true);
          },
          onResponse: () => {
            setIsLoading(false);
          },
          onError: (ctx) => {
            console.log(ctx);
            toast.error("Something went wrong!", {
              description: ctx.error.message,
            });
          },
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        description: "",
      });
    }
  };

  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold tracking-tight">
            Signin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        id="email"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        id="password"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-3 w-full"
                disabled={isLoading}
              >
                Signin
              </Button>
            </form>
          </Form>
          <p className="relative z-10 text-center text-xs text-muted-foreground before:absolute before:top-[50%] before:-z-10 before:block before:h-[0.1px] before:w-full before:-translate-y-[50%] before:bg-border">
            <span className="z-50 rounded-full bg-background p-1">Or</span>
          </p>
          <div>
            <Button
              variant="outline"
              className="w-full"
              onClick={async (e) => {
                e.preventDefault();
                await signIn.social({
                  provider: "github",
                  fetchOptions: {
                    onRequest: () => {
                      setIsLoading(true);
                    },
                    onResponse: () => {
                      setIsLoading(false);
                    },
                    onError: (ctx) => {
                      console.log(ctx);
                      toast.error("Something went wrong!", {
                        description: ctx.error.statusText,
                      });
                    },
                  },
                  callbackURL: import.meta.env.VITE_APP_URL,
                });
              }}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <React.Fragment>
                  <Github />
                  Github
                </React.Fragment>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
