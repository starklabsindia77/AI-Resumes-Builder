"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import { ChevronDown, Loader, Moon, Sun } from "lucide-react";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import useGetSubscription from "@/hooks/use-get-subscription";
const Header = () => {
  const { setTheme } = useTheme();
  const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();
  const { data: subscription } = useGetSubscription();
  const isPro = subscription?.plan === "pro" || subscription?.plan === "enterprise";

  return (
    <div
      className="w-full sticky top-0 z-50 glass-card backdrop-blur-xl !border-b !border-t-0 !border-x-0 !rounded-none shadow-sm bg-white/70 dark:bg-slate-950/70"
    >
      <div
        className="w-full mx-auto max-w-7xl
        py-2 px-5 flex items-center justify-between
        "
      >
        <div
          className="flex items-center
            flex-1 gap-9
            "
        >
          <div>
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">S</div>
              <h5 className="font-black text-xl tracking-tight text-emerald-600">SmartCraft</h5>
            </Link>
          </div>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <span
                className="font-normal
               text-black/50
               dark:text-primary-foreground text-sm"
              >
                Hi,
              </span>
              <h5
                className="font-bold text-black 
              dark:text-primary-foreground text-sm"
              >
                {user?.given_name}
              </h5>
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isPro ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                {subscription?.plan || 'Starter'}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isLoading || error ? (
            <Loader
              className="animate-spin !size-6 text-black
          dark:text-white
                      "
            />
          ) : (
            <Fragment>
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger role="button">
                    <div className="flex items-center gap-1">
                      <Avatar role="button" className="!cursor-pointer">
                        <AvatarImage src={user?.picture || ""} />
                        <AvatarFallback className="!cursor-pointer">
                          {user?.given_name?.[0]}
                          {user?.family_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown size="17px" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="my-3">
                    <DropdownMenuItem
                      asChild
                      className="!text-red-500 !cursor-pointer font-medium"
                    >
                      <LogoutLink>Log out</LogoutLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
