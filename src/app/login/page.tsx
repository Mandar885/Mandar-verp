import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh">
      <div className="hidden w-1/2 bg-foreground md:flex md:flex-col md:justify-between md:p-12">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-background/60">
            College Management System
          </p>
        </div>
        <div>
          <h1 className="text-6xl font-light tracking-tight text-background">
            EXCS
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/50">
            Enterprise-grade college administration platform. Manage students,
            faculty, courses, and institutional operations from a single interface.
          </p>
        </div>
        <div>
          <p className="text-xs text-background/30">
            EXCS College Admin Portal
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
