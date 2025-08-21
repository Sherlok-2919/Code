'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const toastVariants = cva(
  'group pointer-events-auto relative w-full overflow-hidden rounded-xl border bg-slate-900/90 text-slate-100 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 border-blue-500/30',
  {
    variants: {
      variant: {
        default: 'border-blue-500/30',
        destructive:
          'border-red-500/30 text-red-100 [&>button]:text-red-200',
        success: 'border-green-500/30 text-green-100',
        info: 'border-cyan-500/30 text-cyan-100'
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        toastVariants({ variant }),
        'p-4 grid grid-cols-[1fr_auto] gap-3',
        className
      )}
      {...props}
    />
  )
})
Toast.displayName = 'Toast'

const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('font-semibold', className)} {...props} />
))
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-slate-300 leading-relaxed', className)}
    {...props}
  />
))
ToastDescription.displayName = 'ToastDescription'

type ToastActionElement = React.ReactElement<typeof ToastAction>

const ToastClose = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => (
  <button
    aria-label="Close"
    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-300 transition hover:bg-slate-800/60 hover:text-white"
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
)

const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium bg-blue-600 text-white shadow hover:bg-blue-700 transition',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = 'ToastAction'

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

export { Toast, ToastTitle, ToastDescription, ToastClose, ToastAction }
export type { ToastProps, ToastActionElement }


