import { ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { createContext, useState, useEffect, useContext, useRef } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, Loader2, RefreshCw, LogOut, Phone, Calendar, Menu, CheckCircle2, GraduationCap, Award, Heart, Globe, Stethoscope, Shield, Sparkles, FileHeart, MessageCircle, Users, Star, ChevronDown, ArrowRight, MapPin, Clock, Train, ExternalLink, Zap, BookOpen, CreditCard, Info, AlertCircle, Search, Scissors, UserCheck, ClipboardCheck, Tag, ArrowLeft, ChevronRight, LayoutDashboard, FileText, Settings, Eye, Edit, Plus, EyeOff, Trash2, Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Code, Link as Link$2, Image as Image$1, Undo, Redo, ChevronUp, Check, Save, Upload, Home } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2, toast as toast$1 } from "sonner";
import { useQuery, useQueryClient, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, Navigate, Link, useLocation, useParams, Outlet } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import { createClient as createClient$1 } from "@sanity/client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import ReactMarkdown from "react-markdown";
import * as LabelPrimitive from "@radix-ui/react-label";
import { z } from "zod";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link$1 from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import DOMPurify from "dompurify";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const SUPABASE_URL = "https://hlfdkaekwqokgbexgvkb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsZmRrYWVrd3Fva2diZXhndmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTkwMTgsImV4cCI6MjA3OTU5NTAxOH0.HWHi8BzfXfy_x_0pimGBFlPMUyXIucP_uEHZeasxCT4";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true
  }
});
const AuthContext = createContext(void 0);
const ADMIN_CHECK_TIMEOUT_MS = 8e3;
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);
  const checkAdminRole = async (userId, attempt = 1) => {
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("ADMIN_CHECK_TIMEOUT")), ADMIN_CHECK_TIMEOUT_MS);
      });
      const rpcPromise = supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin"
      });
      const { data, error } = await Promise.race([rpcPromise, timeoutPromise]);
      if (error) {
        if (false) ;
        return false;
      }
      return data === true;
    } catch (err) {
      return false;
    }
  };
  const checkAdminWithRetry = async (userId, maxAttempts = 3) => {
    setIsCheckingAdmin(true);
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      if (attempt > 1) {
        await new Promise((resolve) => setTimeout(resolve, 1e3 * attempt));
      }
      const result = await checkAdminRole(userId, attempt);
      if (result) {
        setIsCheckingAdmin(false);
        return true;
      }
    }
    setIsCheckingAdmin(false);
    return false;
  };
  const recheckAdmin = async () => {
    if (!user) return;
    const adminStatus = await checkAdminWithRetry(user.id, 2);
    setIsAdmin(adminStatus);
  };
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser((newSession == null ? void 0 : newSession.user) ?? null);
        setIsLoading(false);
        if (newSession == null ? void 0 : newSession.user) {
          checkAdminWithRetry(newSession.user.id).then((adminStatus) => {
            setIsAdmin(adminStatus);
          });
        } else {
          setIsAdmin(false);
        }
      }
    );
    const initializeAuth = async () => {
      try {
        const { data: { session: existingSession }, error } = await supabase.auth.getSession();
        if (error) {
          if (false) ;
          setIsLoading(false);
          return;
        }
        if (existingSession == null ? void 0 : existingSession.user) {
          setSession(existingSession);
          setUser(existingSession.user);
          const adminStatus = await checkAdminWithRetry(existingSession.user.id);
          setIsAdmin(adminStatus);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    initializeAuth();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, session, isAdmin, isLoading, isCheckingAdmin, signIn, signOut, recheckAdmin }, children });
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const ProtectedRoute = ({ children }) => {
  const { user, isAdmin, isLoading, isCheckingAdmin, recheckAdmin, signOut } = useAuth();
  const [adminCheckComplete, setAdminCheckComplete] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !isLoading && !isCheckingAdmin) {
      const timer = setTimeout(() => {
        setAdminCheckComplete(true);
      }, 8e3);
      if (isAdmin) {
        setAdminCheckComplete(true);
      }
      return () => clearTimeout(timer);
    }
  }, [user, isLoading, isAdmin, isCheckingAdmin]);
  useEffect(() => {
    if (isAdmin) {
      setAdminCheckComplete(true);
    }
  }, [isAdmin]);
  useEffect(() => {
    if (!isCheckingAdmin && user && !isLoading) {
      setAdminCheckComplete(true);
    }
  }, [isCheckingAdmin, user, isLoading]);
  const handleRetry = async () => {
    setIsRetrying(true);
    setAdminCheckComplete(false);
    await recheckAdmin();
    setIsRetrying(false);
    setAdminCheckComplete(true);
  };
  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/admin/login", replace: true });
  }
  if (isAdmin) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  if (!adminCheckComplete || isCheckingAdmin || isRetrying) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Vérification des droits d'administration..." })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Accès refusé" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Vous n'avez pas les droits d'administration." }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Si vous pensez que c'est une erreur, essayez de réessayer." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center mt-6", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: handleRetry,
          variant: "default",
          disabled: isRetrying,
          children: [
            isRetrying ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4 mr-2" }),
            "Réessayer"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: handleLogout,
          variant: "outline",
          children: [
            /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 mr-2" }),
            "Se reconnecter"
          ]
        }
      )
    ] })
  ] }) });
};
const sanityClient = createClient$1({
  projectId: "6a2np8jy",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  timeout: 3e3
});
const globalQuery = `*[_type == "global"][0]`;
const accueilQuery = `*[_type == "accueil"][0]`;
const parodontieQuery = `*[_type == "parodontie"][0]`;
const implantologieQuery = `*[_type == "implantologie"][0]`;
const esthetiqueQuery = `*[_type == "esthetique"][0]`;
const tarifsQuery = `*[_type == "tarifs"][0]`;
const aboutQuery = `*[_type == "about"][0]`;
const servicesPageQuery = `*[_type == "services_page"][0]`;
const legalQuery = `*[_type == "legal"][0]`;
const contactQuery = `*[_type == "contact"][0]`;
const confidentialiteQuery = `*[_type == "confidentialite"][0]`;
const blogPostsQuery = `*[_type == "blog_post"] | order(date desc) {
  _id, slug, title, excerpt, category, date, keywords,
  "seo": seo { title, description }
}`;
const blogPostBySlugQuery = `*[_type == "blog_post" && slug.current == $slug][0] {
  _id, slug, title, excerpt, content, category, date, keywords,
  "seo": seo { title, description }
}`;
const STALE_TIME = 5 * 60 * 1e3;
function useSanityQuery(key, query, params) {
  return useQuery({
    queryKey: ["sanity", key, params],
    queryFn: async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3e3);
        const data = await sanityClient.fetch(query, params, { signal: controller.signal });
        clearTimeout(timeoutId);
        return data;
      } catch (error) {
        console.error("Sanity fetch failed for", key, error);
        return null;
      }
    },
    staleTime: STALE_TIME,
    gcTime: 10 * 60 * 1e3,
    retry: 0,
    placeholderData: null
  });
}
const queryMap = {
  global: globalQuery,
  accueil: accueilQuery,
  parodontie: parodontieQuery,
  implantologie: implantologieQuery,
  esthetique: esthetiqueQuery,
  tarifs: tarifsQuery,
  about: aboutQuery,
  services_page: servicesPageQuery,
  legal: legalQuery,
  contact: contactQuery,
  confidentialite: confidentialiteQuery
};
function useGlobalSettings() {
  return useSanityQuery("global", globalQuery);
}
function useSanityPage(type) {
  const query = queryMap[type];
  if (!query) {
    throw new Error(`Unknown Sanity page type: ${type}`);
  }
  return useSanityQuery(type, query);
}
function useBlogPosts() {
  return useSanityQuery("blogPosts", blogPostsQuery);
}
function useBlogPost(slug) {
  return useSanityQuery(`blogPost-${slug}`, blogPostBySlugQuery, { slug });
}
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: global } = useGlobalSettings();
  const nom = (global == null ? void 0 : global.nom_praticien) ?? "Dr Stéphanie Meriot";
  const titre = (global == null ? void 0 : global.titre_praticien) ?? "Chirurgien dentiste";
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/services", label: "Services" },
    { to: "/blog", label: "Blog" },
    { to: "/a-propos", label: "À propos" },
    { to: "/tarifs", label: "Tarifs" },
    { to: "/parodontie", label: "Parodontie" },
    { to: "/implantologie", label: "Implantologie" },
    { to: "/contact", label: "Contact" }
  ];
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-card/95 backdrop-blur-md shadow-soft" : "bg-transparent"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-20", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-primary", children: nom }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground font-medium", children: titre })
          ] }) }),
          /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center space-x-8", children: navLinks.map((link) => /* @__PURE__ */ jsx(
            Link,
            {
              to: link.to,
              className: "text-foreground hover:text-primary transition-colors duration-300 font-medium",
              children: link.label
            },
            link.to
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx("a", { href: telHref, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "gap-2", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
              tel
            ] }) }),
            /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxs(Button, { className: "gap-2 bg-primary hover:bg-primary-hover", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
              "Prendre RDV"
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "lg:hidden p-2",
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
            }
          )
        ] }),
        isMobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "lg:hidden pb-6 animate-fade-in", children: [
          /* @__PURE__ */ jsx("nav", { className: "flex flex-col space-y-4 mb-4", children: navLinks.map((link) => /* @__PURE__ */ jsx(
            Link,
            {
              to: link.to,
              className: "text-foreground hover:text-primary transition-colors duration-300 py-2",
              onClick: () => setIsMobileMenuOpen(false),
              children: link.label
            },
            link.to
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-2", children: [
            /* @__PURE__ */ jsx("a", { href: telHref, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full gap-2", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
              tel
            ] }) }),
            /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxs(Button, { className: "w-full gap-2 bg-primary hover:bg-primary-hover", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
              "Prendre RDV"
            ] }) })
          ] })
        ] })
      ] })
    }
  );
};
const drMeriotPhoto = "/assets/dr-meriot-photo-4oW1bGpM.png";
const Hero = () => {
  const { data: global } = useGlobalSettings();
  const { data: accueil } = useSanityPage("accueil");
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const titre = (accueil == null ? void 0 : accueil.heroTitle) ?? "Votre sourire entre de bonnes mains";
  const sousTitre = (accueil == null ? void 0 : accueil.heroSubtitle) ?? "Spécialiste en parodontie et implantologie à Marseille 4ème — Traitement des gencives et pose d'implants";
  const heroPhoto = (accueil == null ? void 0 : accueil.heroImage) ? accueil.heroImage : drMeriotPhoto;
  const ctaTexte = (accueil == null ? void 0 : accueil.heroCtaText) ?? "Prendre rendez-vous";
  const ctaUrl = (accueil == null ? void 0 : accueil.heroCtaUrl) ?? doctolibUrl;
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center pt-20 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-20 bg-gradient-to-br from-background via-background to-primary/5" }),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-y-0 right-0 w-1/2 -z-10 hidden lg:block overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: heroPhoto,
          alt: "Dr Stéphanie Meriot - Chirurgien-dentiste Marseille 4ème - Parodontie Implantologie",
          className: "w-full h-full object-cover object-[center_12%] lg:translate-y-10 lg:scale-110"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl animate-fade-in-up lg:pr-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Conventionnée Secteur 1 • Carte Vitale" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight", children: titre.includes("de bonnes mains") ? /* @__PURE__ */ jsxs(Fragment, { children: [
        titre.split("de bonnes mains")[0],
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: "de bonnes mains" })
      ] }) : titre }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed", children: sousTitre }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsx("a", { href: ctaUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "w-full sm:w-auto gap-2 bg-primary hover:bg-primary-hover text-lg px-8 py-6", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
          ctaTexte
        ] }) }),
        /* @__PURE__ */ jsx("a", { href: telHref, children: /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "outline", className: "w-full sm:w-auto gap-2 text-lg px-8 py-6", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
          tel
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12", children: ["Métro Chartreux (M1)", "⭐⭐⭐⭐⭐ 5/5 étoiles", "🇫🇷 🇬🇧 🇪🇸 Trilingue"].map((f, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-primary flex-shrink-0" }),
        /* @__PURE__ */ jsx("span", { children: f })
      ] }, i)) })
    ] }) })
  ] });
};
const defaultHighlights = [
  { icon: GraduationCap, title: "Formations spécialisées", desc: "IFPIO Marseille, Académie de paro Aix-en-Provence", color: "bg-primary/10", iconColor: "text-primary" },
  { icon: Award, title: "Expérience internationale", desc: "Marseille, Paris, Genève (Suisse)", color: "bg-accent/10", iconColor: "text-accent" },
  { icon: Heart, title: "Approche bienveillante", desc: "Prise en compte de l'anxiété dentaire", color: "bg-secondary/30", iconColor: "text-primary" },
  { icon: Globe, title: "Multilingue", desc: "🇫🇷 Français · 🇬🇧 Anglais · 🇪🇸 Espagnol", color: "bg-muted", iconColor: "text-accent" }
];
const Practitioner = () => {
  const { data: accueil } = useSanityPage("accueil");
  const photoSrc = (accueil == null ? void 0 : accueil.praticienPhoto) || drMeriotPhoto;
  const nom = (accueil == null ? void 0 : accueil.praticienNom) ?? "Dr Stéphanie Meriot";
  const description = (accueil == null ? void 0 : accueil.praticienDescription) ?? "Diplômée de la Faculté d'odontologie de Marseille, je suis chirurgien-dentiste spécialisée en parodontie et implantologie. Mon approche repose sur l'écoute, la douceur et le respect du rythme de chaque patient.";
  const parcours = (accueil == null ? void 0 : accueil.praticienParcours) ?? "Ma thèse sur la dentisterie à minima reflète ma philosophie : préserver au maximum vos tissus naturels tout en vous offrant des soins de qualité. Chaque traitement est personnalisé et expliqué avec clarté.";
  const citation = (accueil == null ? void 0 : accueil.praticienCitation) ?? "Je prends le temps d'expliquer chaque étape de vos soins, pour que vous vous sentiez en confiance et acteur de votre santé bucco-dentaire.";
  return /* @__PURE__ */ jsxs("section", { className: "pt-6 pb-20 bg-muted/30 relative overflow-hidden", id: "a-propos", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "relative animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 rounded-3xl transform rotate-3" }),
        /* @__PURE__ */ jsx("div", { className: "relative bg-card rounded-3xl shadow-medium p-2 transform -rotate-2 hover:rotate-0 transition-all duration-500", children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 z-10" }),
          /* @__PURE__ */ jsx("img", { src: photoSrc, alt: "Dr Stéphanie Meriot - Chirurgien-dentiste spécialiste parodontie implantologie Marseille", className: "w-full h-auto object-cover" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-8 -left-8 w-32 h-32 bg-primary/15 rounded-full blur-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "animate-fade-in-up", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary font-medium text-sm uppercase tracking-wide", children: "Votre praticienne" }),
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mt-4 mb-6", children: nom }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-6 leading-relaxed", children: description }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-8 leading-relaxed", children: parcours }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4 mb-8", children: defaultHighlights.map((h, i) => {
          const Icon = h.icon;
          return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: `p-2 ${h.color} rounded-lg`, children: /* @__PURE__ */ jsx(Icon, { className: `h-5 w-5 ${h.iconColor}` }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: h.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: h.desc })
            ] })
          ] }, i);
        }) }),
        /* @__PURE__ */ jsx("blockquote", { className: "border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg mb-6", children: /* @__PURE__ */ jsxs("p", { className: "italic text-muted-foreground", children: [
          '"',
          citation,
          '"'
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/a-propos", children: /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "gap-2 hover:bg-primary/5 transition-all", children: "Découvrir mon parcours complet" }) })
      ] })
    ] }) }) })
  ] });
};
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const paroLogo = "/assets/paro-logo-d-r5VUUI.png";
const implantoLogo = "/assets/implanto-logo-CJErAg8w.png";
const services = [
  {
    icon: Stethoscope,
    title: "Soins dentaires généraux",
    description: "Consultations, détartrage, soins des caries, dévitalisation. Prise en charge complète de votre santé bucco-dentaire.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    image: paroLogo,
    title: "Parodontie - Spécialité",
    description: "Traitement des maladies des gencives, détartrage approfondi, chirurgie parodontale, greffe gingivale.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    featured: true
  },
  {
    image: implantoLogo,
    title: "Implantologie - Spécialité",
    description: "Pose d'implants dentaires, régénération osseuse, restauration complète. Solution durable pour remplacer vos dents.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    featured: true
  },
  {
    icon: Shield,
    title: "Prévention et hygiène",
    description: "Conseils personnalisés, suivi régulier, techniques de brossage adaptées. Prévenir vaut mieux que guérir.",
    color: "text-secondary-foreground",
    bgColor: "bg-secondary"
  },
  {
    icon: Sparkles,
    title: "Esthétique dentaire",
    description: "Blanchiment, corrections esthétiques. Retrouvez un sourire éclatant en toute sérénité.",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: FileHeart,
    title: "Dentisterie conservatrice",
    description: "Approche minimale invasive selon ma thèse. Préservation maximale de vos tissus naturels.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  }
];
const Services$1 = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-20", id: "services", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16 animate-fade-in-up", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary font-medium text-sm uppercase tracking-wide", children: "Nos prestations" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mt-4 mb-6", children: "Des soins adaptés à vos besoins" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "Du simple détartrage à la pose d'implants, je vous accompagne avec expertise et bienveillance dans tous vos soins dentaires." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((service, index) => {
      const Icon = service.icon;
      return /* @__PURE__ */ jsxs(
        Card,
        {
          className: `hover-lift shadow-soft hover:shadow-medium transition-all duration-300 ${service.featured ? "border-primary/50" : ""}`,
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: `p-3 rounded-xl ${service.bgColor}`, children: service.image ? /* @__PURE__ */ jsx("img", { src: service.image, alt: service.title, className: "h-6 w-6 object-contain" }) : Icon ? /* @__PURE__ */ jsx(Icon, { className: `h-6 w-6 ${service.color}` }) : null }),
                service.featured && /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full", children: "Spécialité" })
              ] }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: service.title })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: service.description }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/services",
                  className: "text-primary hover:text-primary-hover font-medium text-sm inline-flex items-center gap-1 transition-colors",
                  children: [
                    "En savoir plus",
                    /* @__PURE__ */ jsx("span", { children: "→" })
                  ]
                }
              )
            ] })
          ]
        },
        index
      );
    }) })
  ] }) });
};
const defaultValues = [
  { icon: Heart, title: "Écoute et bienveillance", description: "Chaque patient est unique. Je prends le temps de comprendre vos besoins et vos préoccupations pour vous proposer des soins adaptés." },
  { icon: MessageCircle, title: "Explications claires", description: "Je vous explique chaque étape de vos soins avec des mots simples, pour que vous soyez pleinement informé et rassuré." },
  { icon: Shield, title: "Dentisterie à minima", description: "Ma philosophie : préserver au maximum vos tissus naturels tout en garantissant des soins efficaces et durables." },
  { icon: Users, title: "Approche personnalisée", description: "Je respecte votre rythme et prends en compte votre anxiété éventuelle. Votre confort est ma priorité." }
];
const Philosophy = () => {
  const { data: accueil } = useSanityPage("accueil");
  const { data: global } = useGlobalSettings();
  const nom = (global == null ? void 0 : global.nom_praticien) ?? "Dr Stéphanie Meriot";
  const titre = (accueil == null ? void 0 : accueil.philosophieTitle) ?? "Une dentisterie à l'écoute et respectueuse";
  const description = (accueil == null ? void 0 : accueil.philosophieDescription) ?? "Mon approche repose sur quatre piliers fondamentaux pour vous offrir des soins de qualité dans un climat de confiance.";
  const citation = (accueil == null ? void 0 : accueil.philosophieCitation) ?? "Votre sourire mérite une attention particulière. Je m'engage à vous offrir des soins de qualité dans un environnement chaleureux et rassurant.";
  const values = (accueil == null ? void 0 : accueil.philosophieValeurs) ?? defaultValues;
  return /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16 animate-fade-in-up", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary font-medium text-sm uppercase tracking-wide", children: "Ma philosophie" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mt-4 mb-6", children: titre }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: values.map((value, index) => {
      var _a;
      const Icon = ((_a = defaultValues[index]) == null ? void 0 : _a.icon) ?? Heart;
      return /* @__PURE__ */ jsxs("div", { className: "flex gap-6 p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover-lift", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "p-4 bg-primary/10 rounded-xl", children: /* @__PURE__ */ jsx(Icon, { className: "h-8 w-8 text-primary" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3", children: value.titre ?? value.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: value.description })
        ] })
      ] }, index);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs("blockquote", { className: "text-2xl font-medium italic text-foreground leading-relaxed", children: [
        '"',
        citation,
        '"'
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-6 text-primary font-semibold", children: [
        "— ",
        nom
      ] })
    ] })
  ] }) });
};
const defaultTestimonials = [
  { name: "Marie D.", rating: 5, text: "Professionnelle, douce et à l'écoute. Le Dr Meriot prend le temps d'expliquer et de rassurer. Je recommande vivement !", date: "Il y a 2 mois" },
  { name: "Jean-Paul R.", rating: 5, text: "Enfin un cabinet où on se sent en confiance. Explications claires avant chaque soin. Mes gencives vont beaucoup mieux.", date: "Il y a 1 mois" },
  { name: "Sophie L.", rating: 5, text: "Excellente parodontiste. J'avais très peur du dentiste, mais le Dr Meriot a su me mettre à l'aise. Cabinet moderne et accueillant.", date: "Il y a 3 semaines" },
  { name: "Antoine M.", rating: 5, text: "Très satisfait de ma pose d'implant. Le Dr Meriot est compétente et rassurante. Le résultat est parfait !", date: "Il y a 1 semaine" }
];
const Testimonials = () => {
  const { data: accueil } = useSanityPage("accueil");
  const testimonials = (accueil == null ? void 0 : accueil.temoignages) ?? defaultTestimonials;
  const titre = (accueil == null ? void 0 : accueil.temoignagesTitle) ?? "Ils nous font confiance";
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/30", id: "temoignages", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16 animate-fade-in-up", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary font-medium text-sm uppercase tracking-wide", children: "Témoignages patients" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mt-4 mb-6", children: titre }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-6 w-6 fill-accent text-accent" }, i)) }),
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold", children: "5/5" }),
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
          "(",
          testimonials.length,
          " avis)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto", children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsx(Card, { className: "hover-lift shadow-soft hover:shadow-medium transition-all duration-300", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg", children: (testimonial.nom ?? testimonial.name ?? "?").charAt(0) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: testimonial.nom ?? testimonial.name }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [...Array(testimonial.rating ?? 5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-accent text-accent" }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mb-3 leading-relaxed", children: [
        '"',
        testimonial.texte ?? testimonial.text,
        '"'
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: testimonial.date })
    ] }) }, index)) })
  ] }) });
};
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const defaultFaqs = [
  { question: "Le cabinet accepte-t-il la carte vitale ?", answer: "Oui, le cabinet est conventionné secteur 1 et accepte la carte vitale ainsi que le tiers payant pour la part Sécurité sociale. Vous n'avancez donc pas les frais correspondant à la part remboursée par l'Assurance Maladie." },
  { question: "Comment prendre rendez-vous ?", answer: "Vous pouvez prendre rendez-vous facilement sur Doctolib 24h/24, ou nous appeler directement au 09 83 43 96 21 pendant nos horaires d'ouverture." },
  { question: "Le cabinet est-il accessible aux personnes à mobilité réduite ?", answer: "Oui, le cabinet se trouve au rez-de-chaussée avec une entrée accessible PMR. L'accès est donc facilité pour les personnes en fauteuil roulant ou avec des difficultés de mobilité." },
  { question: "Quelles langues sont parlées au cabinet ?", answer: "Le Dr Meriot parle français, anglais et espagnol. Vous pouvez donc consulter dans la langue avec laquelle vous êtes le plus à l'aise." },
  { question: "La parodontie, qu'est-ce que c'est ?", answer: "La parodontie est la spécialité qui traite les maladies des gencives et des tissus de soutien des dents (parodonte). Elle permet de soigner les gingivites, parodontites, et de prévenir le déchaussement dentaire. Le Dr Meriot est spécialisée en parodontie grâce à ses formations à l'IFPIO de Marseille et à l'Académie de paro d'Aix-en-Provence." },
  { question: "Qu'est-ce qu'un implant dentaire ?", answer: "Un implant dentaire est une racine artificielle en titane qui est placée dans l'os de la mâchoire pour remplacer une dent manquante. Il sert de support à une couronne dentaire et permet de retrouver une fonction masticatoire optimale de façon durable." },
  { question: "J'ai peur du dentiste, comment cela se passe ?", answer: "L'anxiété dentaire est très courante et nous la prenons en compte. Le Dr Meriot adopte une approche douce et bienveillante : elle prend le temps d'expliquer chaque étape, respecte votre rythme et s'assure de votre confort tout au long des soins. N'hésitez pas à exprimer vos craintes lors de la consultation." },
  { question: "Combien coûte une consultation ?", answer: "Une consultation de base coûte 23€ (tarif conventionné secteur 1). Les autres actes varient selon les soins nécessaires. Nous vous informons toujours du coût avant de débuter un traitement, et établissons un devis détaillé pour les soins plus complexes." },
  { question: "Le cabinet pratique-t-il la dentisterie conservatrice ?", answer: "Oui, c'est même une philosophie centrale du Dr Meriot. Sa thèse porte sur la dentisterie à minima, ce qui signifie qu'elle privilégie les techniques permettant de conserver au maximum vos tissus naturels (émail, dentine) tout en assurant des soins efficaces et durables." }
];
const FAQ = () => {
  const { data: accueil } = useSanityPage("accueil");
  const faqs = (accueil == null ? void 0 : accueil.faq) ?? defaultFaqs;
  const titre = (accueil == null ? void 0 : accueil.faqTitle) ?? "Vos questions, nos réponses";
  return /* @__PURE__ */ jsx("section", { className: "py-20", id: "faq", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16 animate-fade-in-up", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary font-medium text-sm uppercase tracking-wide", children: "Questions fréquentes" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mt-4 mb-6", children: titre }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "Vous avez des interrogations ? Consultez notre FAQ ou contactez-nous directement." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-4", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(
      AccordionItem,
      {
        value: `item-${index}`,
        className: "border border-border rounded-lg px-6 shadow-soft hover:shadow-medium transition-shadow",
        children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left hover:text-primary hover:no-underline py-4", children: /* @__PURE__ */ jsx("span", { className: "font-semibold", children: faq.question }) }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-muted-foreground pb-4 leading-relaxed", children: faq.reponse ?? faq.answer })
        ]
      },
      index
    )) }) })
  ] }) });
};
const defaultSpecialties = [
  { title: "Parodontie", description: "Soins des gencives et des tissus de soutien des dents", href: "/parodontie" },
  { title: "Implantologie", description: "Remplacement durable de vos dents manquantes", href: "/implantologie" }
];
const QuickLinks = () => {
  const { data: accueil } = useSanityPage("accueil");
  const items = (accueil == null ? void 0 : accueil.specialites) ?? defaultSpecialties;
  const label = (accueil == null ? void 0 : accueil.quicklinksLabel) ?? "✨ Découvrez nos spécialités";
  const titre = (accueil == null ? void 0 : accueil.quicklinksTitle) ?? "Accès direct à nos expertises";
  return /* @__PURE__ */ jsx("section", { className: "py-16 bg-gradient-to-b from-background to-muted/30 -mt-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-12 animate-fade-in-up", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary font-semibold text-base uppercase tracking-wide", children: label }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mt-3 mb-4", children: titre })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: items.map((specialty, index) => /* @__PURE__ */ jsx(
      Link,
      {
        to: specialty.href ?? "/services",
        className: "group block transform transition-all duration-300 hover:scale-105",
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: `bg-card rounded-3xl p-10 shadow-medium hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-4 ${index === 0 ? "border-accent/30" : "border-primary/30"} hover:border-primary transition-all duration-300 h-full flex flex-col cursor-pointer`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors", children: specialty.titre ?? specialty.title }),
                /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground leading-relaxed mb-6", children: specialty.description })
              ] }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "lg",
                  className: `w-full text-base font-semibold gap-2 mt-auto ${index === 0 ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary-hover"}`,
                  children: [
                    "Découvrir",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5 group-hover:translate-x-1 transition-transform" })
                  ]
                }
              )
            ]
          }
        )
      },
      index
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 mb-2 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "h-px bg-border w-32" }),
      /* @__PURE__ */ jsx("div", { className: "mx-4 text-muted-foreground text-sm", children: "ou explorez" }),
      /* @__PURE__ */ jsx("div", { className: "h-px bg-border w-32" })
    ] })
  ] }) });
};
const defaultZones = [
  { secteur: "Marseille", villes: ["Tous arrondissements (13001-13016)"] },
  { secteur: "Alentours proches", villes: ["Allauch", "Plan-de-Cuques", "Les Pennes-Mirabeau", "Septèmes-les-Vallons", "La Penne-sur-Huveaune"] },
  { secteur: "Pays d'Aix", villes: ["Aix-en-Provence", "Gardanne", "Bouc-Bel-Air", "Cabriès", "Simiane-Collongue", "Meyreuil", "Fuveau", "Rousset"] },
  { secteur: "Côte Bleue", villes: ["Carry-le-Rouet", "Sausset-les-Pins", "Marignane", "Vitrolles", "Châteauneuf-les-Martigues", "Gignac-la-Nerthe"] },
  { secteur: "Aubagne & La Ciotat", villes: ["Aubagne", "Gémenos", "Carnoux", "La Ciotat", "Cassis", "Roquefort-la-Bédoule", "Ceyreste"] },
  { secteur: "Vallée de l'Huveaune", villes: ["Roquevaire", "Auriol", "La Destrousse", "Peypin", "La Bouilladisse", "Trets"] },
  { secteur: "Étang de Berre", villes: ["Martigues", "Istres", "Fos-sur-Mer", "Port-de-Bouc", "Berre-l'Étang", "Rognac", "Velaux", "Miramas"] },
  { secteur: "Salon & environs", villes: ["Salon-de-Provence", "Pélissanne", "Lançon-Provence", "La Fare-les-Oliviers", "Lambesc"] }
];
const defaultHoraires = [
  { jour: "Lundi", val: "09h-12h, 14h-17h" },
  { jour: "Mardi", val: "09h-12h, 14h-18h" },
  { jour: "Mercredi", val: "Fermé" },
  { jour: "Jeudi", val: "09h-12h, 14h-18h" },
  { jour: "Vendredi", val: "09h-14h" },
  { jour: "Sam-Dim", val: "Fermé" }
];
const Contact = () => {
  const { data: global } = useGlobalSettings();
  const { data: accueil } = useSanityPage("accueil");
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const adresse = (global == null ? void 0 : global.adresse) ?? "23 Boulevard de la Fédération, 13004 Marseille";
  const mapsUrl = (global == null ? void 0 : global.maps_url) ?? "https://maps.google.com/?q=23+Boulevard+de+la+Fédération+13004+Marseille";
  const mapsEmbed = (global == null ? void 0 : global.maps_embed_url) ?? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.8!2d5.3947!3d43.3117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0c2e5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2s23%20Boulevard%20de%20la%20F%C3%A9d%C3%A9ration%2C%2013004%20Marseille!5e0!3m2!1sfr!2sfr!4v1234567890";
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const horaires = (global == null ? void 0 : global.horaires) ? global.horaires.map((h) => ({
    jour: h.jour,
    val: h.ferme ? "Fermé" : h.heures || `${h.heures_debut}-${h.heures_fin}`
  })) : defaultHoraires;
  const zones = (accueil == null ? void 0 : accueil.zones) ?? defaultZones;
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/30", id: "contact", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16 animate-fade-in-up", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary font-medium text-sm uppercase tracking-wide", children: "Nous contacter" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mt-4 mb-6", children: "Prenez rendez-vous facilement" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "Situé à Marseille 4ème, près du métro Chartreux, notre cabinet est facilement accessible." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Adresse" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-3", children: adresse.split(",").map((part, i) => /* @__PURE__ */ jsxs("span", { children: [
              part.trim(),
              i === 0 && /* @__PURE__ */ jsx("br", {})
            ] }, i)) }),
            /* @__PURE__ */ jsx("a", { href: mapsUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: "Voir sur Google Maps" }) })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-accent/10 rounded-lg", children: /* @__PURE__ */ jsx(Phone, { className: "h-6 w-6 text-accent" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Téléphone" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-3", children: tel }),
            /* @__PURE__ */ jsx("a", { href: telHref, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
              "Appeler le cabinet"
            ] }) })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-3", children: "Horaires" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2 text-sm", children: horaires.map(({ jour, val }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: jour }),
              /* @__PURE__ */ jsx("span", { className: val === "Fermé" ? "text-destructive" : "", children: val })
            ] }, jour)) })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-secondary rounded-lg", children: /* @__PURE__ */ jsx(Train, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Accès" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-primary rounded-full" }),
                "Métro : Chartreux (ligne M1)"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-accent rounded-full" }),
                "Bus : Saint Just Ivaldi (42T)"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-accent rounded-full" }),
                "Parking public à proximité"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-primary rounded-full" }),
                "Entrée accessible PMR"
              ] })
            ] })
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-[600px] rounded-2xl overflow-hidden shadow-medium", children: /* @__PURE__ */ jsx(
        "iframe",
        {
          src: mapsEmbed,
          width: "100%",
          height: "100%",
          style: { border: 0 },
          allowFullScreen: true,
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade",
          title: "Localisation du cabinet Dr Stéphanie Meriot"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold mb-4", children: "Zone d'intervention" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Le cabinet accueille des patients de Marseille et de toute la région, dans un rayon de 50 km." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: zones.map(({ secteur, villes }) => /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-xl p-5 shadow-soft", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3 pb-2 border-b", children: secteur }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1 text-sm text-muted-foreground", children: villes.map((ville) => /* @__PURE__ */ jsx("li", { children: ville }, ville)) })
      ] }, secteur)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gap-2 bg-primary hover:bg-primary-hover text-lg px-8 py-6", children: [
      /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
      "Prendre rendez-vous sur Doctolib"
    ] }) }) })
  ] }) });
};
const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const { data: global } = useGlobalSettings();
  const nom = (global == null ? void 0 : global.nom_praticien) ?? "Dr Stéphanie Meriot";
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const adresse = (global == null ? void 0 : global.adresse) ?? "23 Bd de la Fédération\n13004 Marseille";
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const horaires = (global == null ? void 0 : global.horaires) ?? [
    { jour: "Lundi", heures: "9h-12h, 14h-17h", ferme: false },
    { jour: "Mardi", heures: "9h-12h, 14h-18h", ferme: false },
    { jour: "Mercredi", heures: "Fermé", ferme: true },
    { jour: "Jeudi", heures: "9h-12h, 14h-18h", ferme: false },
    { jour: "Vendredi", heures: "9h-14h", ferme: false }
  ];
  return /* @__PURE__ */ jsx("footer", { className: "bg-dental-navy text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-playfair font-semibold mb-4", children: nom }),
        /* @__PURE__ */ jsx("p", { className: "text-dental-soft-blue text-sm mb-4", children: "Chirurgien-Dentiste spécialisée en parodontie et implantologie" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2 text-sm text-dental-soft-blue mb-2", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: adresse.replace(/\n/g, "<br />") } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm text-dental-soft-blue mb-2", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 flex-shrink-0" }),
          /* @__PURE__ */ jsx("a", { href: telHref, className: "hover:text-white transition-colors", children: tel })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: doctolibUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center space-x-1 text-dental-coral hover:text-white transition-colors text-sm mt-2",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Prendre RDV sur Doctolib" }),
              /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-lg font-playfair font-semibold mb-4 flex items-center", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 mr-2" }),
          "Horaires"
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm text-dental-soft-blue", children: horaires.map((h) => /* @__PURE__ */ jsxs("li", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: h.jour }),
          /* @__PURE__ */ jsx("span", { className: h.ferme ? "text-dental-coral" : "", children: h.ferme ? "Fermé" : h.heures || `${h.heures_debut}-${h.heures_fin}` })
        ] }, h.jour)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-playfair font-semibold mb-4", children: "Liens Rapides" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: [
          { to: "/parodontie", label: "Parodontie" },
          { to: "/implantologie", label: "Implantologie" },
          { to: "/esthetique", label: "Esthétique dentaire" },
          { to: "/services", label: "Tous les soins" },
          { to: "/tarifs", label: "Tarifs" },
          { to: "/blog", label: "Blog & Conseils" },
          { to: "/contact", label: "Contact" }
        ].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.to, className: "text-dental-soft-blue hover:text-white transition-colors", children: link.label }) }, link.to)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-playfair font-semibold mb-4", children: "Informations" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: [
          { to: "/a-propos", label: "À propos" },
          { to: "/contact", label: "Contact & Accès" },
          { to: "/mentions-legales", label: "Mentions légales" },
          { to: "/confidentialite", label: "Politique de confidentialité" }
        ].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.to, className: "text-dental-soft-blue hover:text-white transition-colors", children: link.label }) }, link.to)) }),
        /* @__PURE__ */ jsx("p", { className: "text-dental-soft-blue/70 text-xs mt-6", children: "Cabinet dentaire à Marseille et environs (50km)" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-dental-soft-blue/20 mt-10 pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center text-xs text-dental-soft-blue", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        currentYear,
        " ",
        nom,
        " - Chirurgien-Dentiste Marseille. Tous droits réservés."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 mt-4 md:mt-0", children: [
        /* @__PURE__ */ jsx(Link, { to: "/mentions-legales", className: "hover:text-white transition-colors", children: "Mentions légales" }),
        /* @__PURE__ */ jsx(Link, { to: "/confidentialite", className: "hover:text-white transition-colors", children: "Politique de confidentialité" })
      ] })
    ] }) })
  ] }) });
};
const SEOHead = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  keywords,
  articlePublishedTime,
  articleAuthor
}) => {
  const siteUrl = "https://www.dr-meriot-chirurgien-dentiste.fr";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const defaultOgImage = `${siteUrl}/og-image.jpg`;
  const siteName = "Dr Stéphanie Meriot - Dentiste Marseille";
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: fullCanonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: siteName }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: fullCanonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: ogTitle || title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: ogDescription || description }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage || defaultOgImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: "Dr Stéphanie Meriot - Cabinet dentaire spécialisé en parodontie à Marseille" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "fr_FR" }),
    ogType === "article" && articlePublishedTime && /* @__PURE__ */ jsx("meta", { property: "article:published_time", content: articlePublishedTime }),
    ogType === "article" && articleAuthor && /* @__PURE__ */ jsx("meta", { property: "article:author", content: articleAuthor }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: "@DrMeriotDentist" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:creator", content: "@DrMeriotDentist" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: fullCanonical }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: ogTitle || title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: ogDescription || description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage || defaultOgImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image:alt", content: "Dr Stéphanie Meriot - Cabinet dentaire spécialisé en parodontie à Marseille" }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }),
    /* @__PURE__ */ jsx("meta", { name: "language", content: "fr" }),
    /* @__PURE__ */ jsx("meta", { name: "geo.region", content: "FR-13" }),
    /* @__PURE__ */ jsx("meta", { name: "geo.placename", content: "Marseille" }),
    /* @__PURE__ */ jsx("meta", { name: "geo.position", content: "43.3117;5.3947" }),
    /* @__PURE__ */ jsx("meta", { name: "ICBM", content: "43.3117, 5.3947" }),
    /* @__PURE__ */ jsx("meta", { name: "revisit-after", content: "7 days" }),
    /* @__PURE__ */ jsx("meta", { name: "author", content: "Dr Stéphanie Meriot" }),
    /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#e07b91" }),
    /* @__PURE__ */ jsx("meta", { name: "apple-mobile-web-app-title", content: "Dr Meriot Dentiste" })
  ] });
};
const FloatingCTA = () => {
  const { data: global } = useGlobalSettings();
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-4 right-4 z-50 md:hidden", children: /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", className: "block", children: /* @__PURE__ */ jsxs(
    Button,
    {
      size: "lg",
      className: "gap-2 bg-primary hover:bg-primary-hover shadow-medium rounded-full px-6 py-6 animate-fade-in",
      children: [
        /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Prendre RDV" })
      ]
    }
  ) }) });
};
const LocalBusinessSchema = () => {
  var _a, _b, _c, _d, _e;
  const { data: global } = useGlobalSettings();
  const nom = (global == null ? void 0 : global.nom_praticien) ?? "Dr Stéphanie Meriot";
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "+33983439621";
  const email = (global == null ? void 0 : global.email) ?? "cabinet@dr-meriot-chirurgien-dentiste.fr";
  const siteUrl = (global == null ? void 0 : global.site_url) ?? "https://www.dr-meriot-chirurgien-dentiste.fr";
  const adresse = (global == null ? void 0 : global.adresse) ?? "23 Boulevard de la Fédération, 13004 Marseille";
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const lat = ((_a = global == null ? void 0 : global.geo) == null ? void 0 : _a.lat) ?? 43.3047;
  const lng = ((_b = global == null ? void 0 : global.geo) == null ? void 0 : _b.lng) ?? 5.3964;
  const streetAddress = ((_c = adresse.split(",")[0]) == null ? void 0 : _c.trim()) ?? "23 Boulevard de la Fédération";
  const postalCity = ((_d = adresse.split(",")[1]) == null ? void 0 : _d.trim()) ?? "13004 Marseille";
  const postalCode = ((_e = postalCity.match(/\d{5}/)) == null ? void 0 : _e[0]) ?? "13004";
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": `${nom} - Chirurgien-Dentiste Marseille`,
      "description": "Chirurgien-dentiste spécialisée en parodontie et implantologie à Marseille 4ème. Traitement laser des maladies parodontales, pose d'implants dentaires. Conventionnée Secteur 1.",
      "url": siteUrl,
      "telephone": tel.startsWith("+") ? tel : `+33${tel.replace(/\s/g, "").replace(/^0/, "")}`,
      "email": email,
      "image": `${siteUrl}/og-image.jpg`,
      "logo": `${siteUrl}/og-image.jpg`,
      "priceRange": "€€",
      "currenciesAccepted": "EUR",
      "paymentAccepted": "Cash, Credit Card, Check, Carte Vitale",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": streetAddress,
        "addressLocality": "Marseille",
        "postalCode": postalCode,
        "addressRegion": "Provence-Alpes-Côte d'Azur",
        "addressCountry": "FR"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": lat, "longitude": lng },
      "areaServed": [
        "Marseille",
        "Marseille 1er",
        "Marseille 2ème",
        "Marseille 3ème",
        "Marseille 4ème",
        "Marseille 5ème",
        "Marseille 6ème",
        "Marseille 7ème",
        "Marseille 8ème",
        "Marseille 9ème",
        "Marseille 10ème",
        "Marseille 11ème",
        "Marseille 12ème",
        "Marseille 13ème",
        "Marseille 14ème",
        "Marseille 15ème",
        "Marseille 16ème",
        "Allauch",
        "Plan-de-Cuques",
        "Les Pennes-Mirabeau",
        "Septèmes-les-Vallons",
        "La Penne-sur-Huveaune",
        "Aix-en-Provence",
        "Gardanne",
        "Bouc-Bel-Air",
        "Cabriès",
        "Simiane-Collongue",
        "Meyreuil",
        "Fuveau",
        "Rousset",
        "Éguilles",
        "Ventabren",
        "Carry-le-Rouet",
        "Sausset-les-Pins",
        "Ensuès-la-Redonne",
        "Marignane",
        "Vitrolles",
        "Châteauneuf-les-Martigues",
        "Gignac-la-Nerthe",
        "Aubagne",
        "Gémenos",
        "Carnoux-en-Provence",
        "La Ciotat",
        "Cassis",
        "Roquefort-la-Bédoule",
        "Ceyreste",
        "Roquevaire",
        "Auriol",
        "La Destrousse",
        "Peypin",
        "La Bouilladisse",
        "Cuges-les-Pins",
        "Trets",
        "Saint-Maximin-la-Sainte-Baume",
        "Martigues",
        "Istres",
        "Fos-sur-Mer",
        "Port-de-Bouc",
        "Berre-l'Étang",
        "Rognac",
        "Velaux",
        "Miramas",
        "Saint-Chamas",
        "Saint-Mitre-les-Remparts",
        "Grans",
        "La Fare-les-Oliviers",
        "Coudoux",
        "Lançon-Provence",
        "Salon-de-Provence",
        "Pélissanne",
        "Eyguières",
        "Lambesc"
      ],
      "medicalSpecialty": ["Periodontics", "Dental Implants", "Cosmetic Dentistry"],
      "availableService": [
        { "@type": "MedicalProcedure", "name": "Traitement parodontal", "description": "Traitement des maladies parodontales par surfaçage radiculaire et laser" },
        { "@type": "MedicalProcedure", "name": "Pose d'implants dentaires", "description": "Chirurgie implantaire pour remplacement des dents manquantes" },
        { "@type": "MedicalProcedure", "name": "Traitement laser", "description": "Thérapie laser pour le traitement des poches parodontales" },
        { "@type": "MedicalProcedure", "name": "Esthétique dentaire", "description": "Blanchiment, facettes et corrections esthétiques" }
      ],
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday"], "opens": "09:00", "closes": "12:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday"], "opens": "14:00", "closes": "17:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday", "Thursday"], "opens": "09:00", "closes": "12:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday", "Thursday"], "opens": "14:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday"], "opens": "09:00", "closes": "14:00" }
      ],
      "sameAs": [doctolibUrl],
      "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "credentialCategory": "Diplôme", "name": "Diplôme Universitaire de Parodontologie" },
        { "@type": "EducationalOccupationalCredential", "credentialCategory": "Formation", "name": "Formation IFPIO Implantologie" }
      ],
      "knowsLanguage": ["French", "English", "Spanish"],
      "isAcceptingNewPatients": true
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "local-business-schema";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById("local-business-schema");
      if (existingScript) existingScript.remove();
    };
  }, [global]);
  return null;
};
const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": "https://www.dr-meriot-chirurgien-dentiste.fr/#dentist",
        "name": "Cabinet Dentaire Dr Stéphanie Meriot",
        "alternateName": "Dr Stéphanie Meriot - Parodontiste Marseille",
        "description": "Cabinet dentaire spécialisé en parodontologie et implantologie à Marseille. Traitement des maladies des gencives, déchaussement dentaire et pose d'implants.",
        "image": "https://www.dr-meriot-chirurgien-dentiste.fr/og-image.jpg",
        "logo": "https://www.dr-meriot-chirurgien-dentiste.fr/logo.png",
        "url": "https://www.dr-meriot-chirurgien-dentiste.fr",
        "telephone": "+33983439621",
        "email": "contact@dr-meriot-chirurgien-dentiste.fr",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "23 Boulevard de la Fédération",
          "addressLocality": "Marseille",
          "addressRegion": "Provence-Alpes-Côte d'Azur",
          "postalCode": "13004",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.3117,
          "longitude": 5.3947
        },
        "hasMap": "https://maps.google.com/?q=23+Boulevard+de+la+Fédération+13004+Marseille",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday"],
            "opens": "09:00",
            "closes": "12:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday"],
            "opens": "14:00",
            "closes": "17:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Tuesday", "Thursday"],
            "opens": "09:00",
            "closes": "12:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Tuesday", "Thursday"],
            "opens": "14:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Friday",
            "opens": "09:00",
            "closes": "14:00"
          }
        ],
        "knowsAbout": [
          {
            "@type": "MedicalSpecialty",
            "name": "Periodontics",
            "alternateName": "Parodontologie"
          },
          {
            "@type": "MedicalSpecialty",
            "name": "Dental Implantology",
            "alternateName": "Implantologie"
          },
          "Traitement de la gingivite",
          "Traitement de la parodontite",
          "Déchaussement dentaire",
          "Greffe gingivale",
          "Surfaçage radiculaire"
        ],
        "medicalSpecialty": ["Periodontics", "DentalImplantology"],
        "priceRange": "€€",
        "paymentAccepted": ["Carte Vitale", "Tiers payant", "Carte bancaire", "Espèces", "Chèques"],
        "currenciesAccepted": "EUR",
        "areaServed": {
          "@type": "City",
          "name": "Marseille",
          "sameAs": "https://fr.wikipedia.org/wiki/Marseille"
        },
        "isAcceptingNewPatients": true,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "47",
          "reviewCount": "47"
        },
        "sameAs": [
          "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://www.dr-meriot-chirurgien-dentiste.fr/#person",
        "name": "Dr Stéphanie Meriot",
        "givenName": "Stéphanie",
        "familyName": "Meriot",
        "honorificPrefix": "Dr",
        "jobTitle": "Chirurgien-dentiste spécialisée en parodontologie",
        "worksFor": {
          "@id": "https://www.dr-meriot-chirurgien-dentiste.fr/#dentist"
        },
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "Faculté d'Odontologie de Marseille"
          },
          {
            "@type": "EducationalOrganization",
            "name": "IFPIO Marseille",
            "description": "Institut de Formation en Parodontologie et Implantologie Orale"
          },
          {
            "@type": "EducationalOrganization",
            "name": "Académie de Parodontologie d'Aix-en-Provence"
          }
        ],
        "knowsAbout": ["Periodontics", "Dental Implantology", "Parodontologie", "Implantologie"],
        "knowsLanguage": [
          {
            "@type": "Language",
            "name": "French",
            "alternateName": "Français"
          },
          {
            "@type": "Language",
            "name": "English",
            "alternateName": "Anglais"
          },
          {
            "@type": "Language",
            "name": "Spanish",
            "alternateName": "Espagnol"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.dr-meriot-chirurgien-dentiste.fr/#website",
        "url": "https://www.dr-meriot-chirurgien-dentiste.fr",
        "name": "Dr Stéphanie Meriot - Dentiste Parodontiste Marseille",
        "description": "Site officiel du cabinet dentaire Dr Stéphanie Meriot, spécialiste en parodontologie à Marseille",
        "publisher": {
          "@id": "https://www.dr-meriot-chirurgien-dentiste.fr/#dentist"
        },
        "inLanguage": "fr-FR"
      }
    ]
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Parodontie et Soins Dentaires à Marseille - Dr Stéphanie Meriot",
        description: "Spécialiste du traitement des gencives et du déchaussement dentaire à Marseille. Le Dr Stéphanie Meriot soigne gingivite, parodontite et pose d'implants. Cabinet conventionné secteur 1.",
        canonical: "/",
        ogTitle: "Dr Stéphanie Meriot | Experte Parodontie à Marseille",
        ogDescription: "Traitement des maladies des gencives, déchaussement dentaire et implantologie. Cabinet dentaire de confiance à Marseille 4ème. Prenez RDV en ligne.",
        keywords: "parodontie marseille, traitement gencives, déchaussement dentaire, gingivite, parodontite, implantologie marseille, dentiste marseille 4"
      }
    ),
    /* @__PURE__ */ jsx(LocalBusinessSchema, {}),
    /* @__PURE__ */ jsx(FloatingCTA, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsx(Hero, {}),
        /* @__PURE__ */ jsx(QuickLinks, {}),
        /* @__PURE__ */ jsx(Practitioner, {}),
        /* @__PURE__ */ jsx(Services$1, {}),
        /* @__PURE__ */ jsx(Philosophy, {}),
        /* @__PURE__ */ jsx(Testimonials, {}),
        /* @__PURE__ */ jsx(FAQ, {}),
        /* @__PURE__ */ jsx(Contact, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const defaultServicesDetails = [
  {
    icon: "Stethoscope",
    title: "Soins dentaires généraux",
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "Prendre soin de votre santé bucco-dentaire au quotidien avec des soins adaptés à vos besoins.",
    details: [
      { subtitle: "Consultations et examens", text: "Bilan complet de votre santé bucco-dentaire, dépistage précoce des caries et maladies des gencives." },
      { subtitle: "Détartrage", text: "Nettoyage professionnel pour éliminer la plaque et le tartre." },
      { subtitle: "Soins des caries", text: "Traitement des caries avec des matériaux esthétiques et biocompatibles." },
      { subtitle: "Dévitalisation (endodontie)", text: "Traitement des infections de la pulpe dentaire." }
    ]
  },
  {
    icon: "Heart",
    title: "Parodontie - Spécialité",
    color: "text-accent",
    bgColor: "bg-accent/10",
    featured: true,
    description: "Spécialité dédiée à la santé de vos gencives. Formation à l'IFPIO Marseille et l'Académie de paro d'Aix-en-Provence.",
    details: [
      { subtitle: "Diagnostic parodontal", text: "Bilan complet : mesure des poches parodontales, évaluation de la perte osseuse." },
      { subtitle: "Traitement non-chirurgical", text: "Détartrage et surfaçage radiculaire." },
      { subtitle: "Chirurgie parodontale", text: "Réduction des poches, régénération tissulaire guidée." },
      { subtitle: "Greffe gingivale", text: "Reconstruction des gencives rétractées." },
      { subtitle: "Maintenance parodontale", text: "Suivi régulier personnalisé." }
    ]
  },
  {
    icon: "Zap",
    title: "Implantologie - Spécialité",
    color: "text-primary",
    bgColor: "bg-primary/10",
    featured: true,
    description: "Solution moderne et durable pour remplacer vos dents manquantes. Formation IFPIO Marseille.",
    details: [
      { subtitle: "Consultation implantaire", text: "Examen clinique, scanner 3D, plan de traitement personnalisé." },
      { subtitle: "Pose d'implants", text: "Insertion chirurgicale d'implants en titane sous anesthésie locale." },
      { subtitle: "Régénération osseuse", text: "Greffe osseuse si nécessaire." },
      { subtitle: "Restauration prothétique", text: "Couronne, bridge ou prothèse sur implants." },
      { subtitle: "Suivi post-opératoire", text: "Contrôles réguliers pour garantir la réussite." }
    ]
  },
  {
    icon: "Shield",
    title: "Prévention et hygiène",
    color: "text-secondary-foreground",
    bgColor: "bg-secondary",
    description: "La prévention est la clé d'une bonne santé bucco-dentaire.",
    details: [
      { subtitle: "Conseils personnalisés", text: "Techniques de brossage adaptées." },
      { subtitle: "Éducation à l'hygiène", text: "Importance du brossage et du détartrage régulier." },
      { subtitle: "Suivi régulier", text: "Contrôles périodiques pour détection précoce." }
    ]
  },
  {
    icon: "Sparkles",
    title: "Esthétique dentaire",
    color: "text-accent",
    bgColor: "bg-accent/10",
    description: "Retrouvez un sourire éclatant grâce à des solutions esthétiques douces.",
    details: [
      { subtitle: "Blanchiment dentaire", text: "Éclaircissement professionnel des dents." },
      { subtitle: "Corrections esthétiques", text: "Facettes, composites esthétiques." }
    ]
  },
  {
    icon: "FileHeart",
    title: "Dentisterie conservatrice",
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "Préserver au maximum vos tissus naturels. Au cœur de ma thèse universitaire.",
    details: [
      { subtitle: "Dentisterie à minima", text: "Techniques modernes pour préserver l'émail et la dentine." },
      { subtitle: "Diagnostic précoce", text: "Détection des caries au stade débutant." },
      { subtitle: "Matériaux biocompatibles", text: "Composites esthétiques et résistants, sans mercure." }
    ]
  }
];
const iconMap$1 = {
  Stethoscope,
  Heart,
  Zap,
  Shield,
  Sparkles,
  FileHeart
};
const Services = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("services_page");
  const nom = (global == null ? void 0 : global.nom_praticien) ?? "Dr Stéphanie Meriot";
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const servicesList = (page == null ? void 0 : page.servicesList) ?? defaultServicesDetails;
  const seoTitle = (page == null ? void 0 : page.seoTitle) ?? "Services Dentaires Marseille & PACA | Dr Stéphanie Meriot";
  const seoDesc = (page == null ? void 0 : page.seoDescription) ?? `Services dentaires à Marseille : parodontie, implantologie, soins, prévention, esthétique. Secteur 1. ☎ ${tel}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: servicesList.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: s.title,
      description: s.description,
      provider: { "@type": "Dentist", name: nom }
    }))
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDesc,
        canonical: "/services",
        keywords: "services dentaires marseille, soins dentaires, parodontie, implantologie, détartrage, blanchiment"
      }
    ),
    /* @__PURE__ */ jsx(FloatingCTA, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { className: "pt-20", children: [
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-soft", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6", children: (page == null ? void 0 : page.heroTitle) ?? "Nos services dentaires" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: (page == null ? void 0 : page.heroSubtitle) ?? "Du simple détartrage à la chirurgie implantaire, je vous propose une gamme complète de soins dentaires." })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 max-w-5xl", children: servicesList.map((service, index) => {
          const iconName = service.icon ?? Object.keys(iconMap$1)[index] ?? "Stethoscope";
          const Icon = iconMap$1[iconName] ?? Stethoscope;
          const color = service.color ?? "text-primary";
          const bgColor = service.bgColor ?? "bg-primary/10";
          return /* @__PURE__ */ jsxs("div", { className: `mb-16 ${index % 2 === 1 ? "bg-muted/30" : ""} rounded-3xl p-8`, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: `p-4 rounded-xl ${bgColor}`, children: /* @__PURE__ */ jsx(Icon, { className: `h-8 w-8 ${color}` }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: service.title }),
                  service.featured && /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full", children: "Spécialité" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: service.description })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4 ml-20", children: service.details.map((d, j) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: d.subtitle }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: d.text })
            ] }, j)) })
          ] }, index);
        }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-primary/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: (page == null ? void 0 : page.ctaTitre) ?? "Besoin d'un rendez-vous ?" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto", children: (page == null ? void 0 : page.ctaTexte) ?? "Je serai ravie de vous accueillir dans mon cabinet." }),
          /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gap-2 bg-primary hover:bg-primary-hover", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            "Prendre rendez-vous"
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const defaultFormations = [
  { title: "Diplôme de chirurgien-dentiste", desc: "Faculté d'odontologie de Marseille" },
  { title: "Formation en Parodontologie", desc: "IFPIO - Institut de Formation en Parodontologie et Implantologie Orale - Marseille" },
  { title: "Formation complémentaire en Parodontie", desc: "Académie de paro - Aix-en-Provence" },
  { title: "Formation en Implantologie", desc: "IFPIO Marseille - Techniques de pose d'implants, régénération osseuse et prothèse sur implants" },
  { title: "Thèse de doctorat", desc: '"Dentisterie à minima : moyens de diagnostic et approches thérapeutiques"' },
  { title: "Expériences internationales", desc: "France (Marseille, Paris) et Suisse (Genève). 🇫🇷 Français · 🇬🇧 Anglais · 🇪🇸 Espagnol" }
];
const defaultConfiance = [
  { title: "Inscrite à l'Ordre", desc: "Chirurgien-dentiste inscrite à l'Ordre National des Chirurgiens-Dentistes." },
  { title: "Formations spécialisées", desc: "Formations approfondies à l'IFPIO Marseille et à l'Académie de paro d'Aix-en-Provence." },
  { title: "Recherche & Thèse", desc: "Thèse de doctorat sur la dentisterie conservatrice." },
  { title: "Expérience internationale", desc: "Exercice en France et en Suisse." }
];
const defaultPhilosophie = [
  { title: "Écoute et bienveillance", desc: "Je prends le temps d'écouter vos préoccupations." },
  { title: "Approche personnalisée", desc: "Chaque patient est unique. Je respecte votre rythme." },
  { title: "Explications claires", desc: "Je vous explique chaque étape avec des mots simples." },
  { title: "Dentisterie conservatrice", desc: "Je privilégie les techniques préservant vos tissus naturels." }
];
const formationIcons = [GraduationCap, Award, Award, Award, BookOpen, Globe];
const formationColors = [
  { color: "bg-primary/10", iconColor: "text-primary" },
  { color: "bg-accent/10", iconColor: "text-accent" },
  { color: "bg-primary/10", iconColor: "text-primary" },
  { color: "bg-accent/10", iconColor: "text-accent" },
  { color: "bg-secondary", iconColor: "text-primary" },
  { color: "bg-primary/10", iconColor: "text-primary" }
];
const confianceIcons = [Shield, Award, BookOpen, Globe];
const confianceColors = ["text-primary", "text-accent", "text-primary", "text-accent"];
const philosophieIcons = [Heart, Users, BookOpen, Award];
const philosophieColors = ["text-primary", "text-accent", "text-primary", "text-accent"];
const About = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("about");
  const nom = (global == null ? void 0 : global.nom_praticien) ?? "Dr Stéphanie Meriot";
  const photoSrc = (page == null ? void 0 : page.photo) || drMeriotPhoto;
  const formations = (page == null ? void 0 : page.formationsList) ?? defaultFormations;
  const confiance = (page == null ? void 0 : page.confianceList) ?? defaultConfiance;
  const philosophie = (page == null ? void 0 : page.philosophieList) ?? defaultPhilosophie;
  const seoTitle = (page == null ? void 0 : page.seoTitle) ?? `${nom} | Dentiste Parodontie Implantologie Marseille`;
  const seoDesc = (page == null ? void 0 : page.seoDescription) ?? `${nom}, chirurgien-dentiste à Marseille 4ème. Spécialiste parodontie (IFPIO) et implantologie. Approche conservatrice et bienveillante. Trilingue.`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDesc,
        canonical: "/a-propos",
        keywords: "Dr Stéphanie Meriot, dentiste marseille 4, parodontiste marseille, implantologue marseille, IFPIO"
      }
    ),
    /* @__PURE__ */ jsx(FloatingCTA, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { className: "pt-20", children: [
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-soft", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6", children: nom }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground leading-relaxed mb-6", children: (page == null ? void 0 : page.heroSubtitle) ?? "Chirurgien-dentiste à Marseille 4ème, spécialisée en parodontie et implantologie." }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: (page == null ? void 0 : page.heroDescription) ?? "Mon approche repose sur l'écoute, la douceur et le respect du rythme de chaque patient." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("img", { src: photoSrc, alt: `${nom} - Dentiste spécialisée parodontie implantologie Marseille`, className: "rounded-2xl shadow-medium w-full" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10 blur-2xl" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center", children: (page == null ? void 0 : page.formationsTitre) ?? "Parcours et formations" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-8", children: formations.map((f, i) => {
            const Icon = formationIcons[i] ?? GraduationCap;
            const c = formationColors[i] ?? formationColors[0];
            return /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: `p-3 ${c.color} rounded-xl flex-shrink-0`, children: /* @__PURE__ */ jsx(Icon, { className: `h-6 w-6 ${c.iconColor}` }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: f.title }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: f.desc })
              ] })
            ] }, i);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center", children: (page == null ? void 0 : page.confianceTitre) ?? "Pourquoi me faire confiance ?" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: confiance.map((e, i) => {
            const Icon = confianceIcons[i] ?? Shield;
            const color = confianceColors[i] ?? "text-primary";
            return /* @__PURE__ */ jsxs("div", { className: "p-6 bg-card rounded-xl shadow-soft", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsx(Icon, { className: `h-6 w-6 ${color}` }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: e.title })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: e.desc })
            ] }, i);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center", children: (page == null ? void 0 : page.philosophieTitre) ?? "Ma philosophie de soins" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: philosophie.map((p, i) => {
            const Icon = philosophieIcons[i] ?? Heart;
            const color = philosophieColors[i] ?? "text-primary";
            return /* @__PURE__ */ jsxs("div", { className: "p-6 bg-card rounded-xl shadow-soft", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsx(Icon, { className: `h-6 w-6 ${color}` }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: p.title })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: p.desc })
            ] }, i);
          }) }),
          /* @__PURE__ */ jsxs("blockquote", { className: "mt-12 border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-lg", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-lg italic text-muted-foreground mb-4", children: [
              '"',
              (page == null ? void 0 : page.citation) ?? "Je crois en une dentisterie humaine et bienveillante, où chaque patient se sent écouté, respecté et en confiance.",
              '"'
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "font-semibold text-primary", children: [
              "— ",
              nom
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const defaultSecteurItems = ["Carte Vitale acceptée", "Tiers payant Sécurité sociale", "Tarifs conventionnés", "Mutuelle"];
const defaultRemboursements = [
  { icon: "Shield", color: "bg-primary/10", iconColor: "text-primary", title: "Assurance Maladie", desc: "Soins courants remboursés à 60% du tarif conventionné. Tiers payant pour la part SS." },
  { icon: "Heart", color: "bg-accent/10", iconColor: "text-accent", title: "Mutuelle complémentaire", desc: "Remboursement des 40% restant + soins hors nomenclature selon contrat." },
  { icon: "CheckCircle2", color: "bg-green-100 dark:bg-green-900/30", iconColor: "text-green-600 dark:text-green-400", title: "100% Santé (RAC 0)", desc: "Certaines prothèses intégralement prises en charge." }
];
const iconMapTarifs = {
  Shield,
  Heart,
  CheckCircle2
};
const Tarifs = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("tarifs");
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const consultation = (page == null ? void 0 : page.consultation) ?? "23€";
  const implant = (page == null ? void 0 : page.implant) ?? "950€";
  const blanchiment = (page == null ? void 0 : page.blanchiment) ?? "400€";
  const secteurItems = (page == null ? void 0 : page.secteurItems) ?? defaultSecteurItems;
  const remboursements = (page == null ? void 0 : page.remboursementsList) ?? defaultRemboursements;
  const seoTitle = (page == null ? void 0 : page.seoTitle) ?? "Tarifs Dentiste Marseille & PACA | Secteur 1 Conventionné | Dr Meriot";
  const seoDesc = (page == null ? void 0 : page.seoDescription) ?? "Tarifs transparents cabinet Dr Meriot Marseille. Conventionnée secteur 1. Carte Vitale, tiers payant. Consultation 23€. Devis gratuits.";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDesc,
        canonical: "/tarifs",
        keywords: "tarif dentiste marseille, dentiste secteur 1, prix implant dentaire, tarif parodontie, carte vitale, tiers payant"
      }
    ),
    /* @__PURE__ */ jsx(FloatingCTA, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { className: "pt-20", children: [
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-soft", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6", children: (page == null ? void 0 : page.heroTitle) ?? "Tarifs et remboursements" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: (page == null ? void 0 : page.heroSubtitle) ?? "Transparence et clarté sur nos honoraires. Conventionnée secteur 1, je pratique les tarifs de l'Assurance Maladie pour les soins courants." })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsx(Card, { className: "bg-primary/5 border-primary/20 shadow-soft", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-8 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 bg-primary/10 rounded-xl flex-shrink-0", children: /* @__PURE__ */ jsx(Shield, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6", children: (page == null ? void 0 : page.secteurTitre) ?? "Conventionnée Secteur 1" }),
            /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: secteurItems.map((label, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 bg-background/50 rounded-xl p-4", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-primary flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: label })
            ] }, i)) })
          ] })
        ] }) }) }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center", children: (page == null ? void 0 : page.tarifsTitre) ?? "Tarifs indicatifs" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5 text-primary" }),
                "Soins courants"
              ] }) }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "bg-muted/50 rounded-xl p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg", children: "Consultation" }),
                /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-primary", children: consultation })
              ] }) }) })
            ] }),
            /* @__PURE__ */ jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Heart, { className: "h-5 w-5 text-accent" }),
                "Soins spécialisés"
              ] }) }),
              /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "border-b border-border pb-4", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-semibold text-accent mb-1", children: "Parodontie" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: (page == null ? void 0 : page.parodontieInfo) ?? "Devis personnalisé selon la complexité" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "border-b border-border pb-4", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-semibold text-primary mb-1", children: "Implantologie" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "Implant dentaire : ",
                    /* @__PURE__ */ jsx("span", { className: "font-semibold", children: implant })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "Esthétique" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "Blanchiment ",
                    /* @__PURE__ */ jsx("span", { className: "font-semibold", children: blanchiment })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Card, { className: "mt-8 bg-accent/5 border-accent/20 shadow-soft", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6 pb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-accent/10 rounded-lg flex-shrink-0", children: /* @__PURE__ */ jsx(Info, { className: "h-6 w-6 text-accent" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: (page == null ? void 0 : page.devisTitre) ?? "Devis détaillés gratuits" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: (page == null ? void 0 : page.devisTexte) ?? "Pour tous les soins complexes, je vous remets un devis détaillé et transparent avant de débuter le traitement." })
            ] })
          ] }) }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center", children: (page == null ? void 0 : page.remboursementsTitre) ?? "Remboursements et prise en charge" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: remboursements.map((r, i) => {
            const defaultColors = [
              { color: "bg-primary/10", iconColor: "text-primary" },
              { color: "bg-accent/10", iconColor: "text-accent" },
              { color: "bg-green-100 dark:bg-green-900/30", iconColor: "text-green-600 dark:text-green-400" }
            ];
            const iconName = r.icon ?? ["Shield", "Heart", "CheckCircle2"][i] ?? "Shield";
            const Icon = iconMapTarifs[iconName] ?? Shield;
            const c = defaultColors[i] ?? defaultColors[0];
            const color = r.color ?? c.color;
            const iconColor = r.iconColor ?? c.iconColor;
            return /* @__PURE__ */ jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx("div", { className: `w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`, children: /* @__PURE__ */ jsx(Icon, { className: `h-6 w-6 ${iconColor}` }) }),
                /* @__PURE__ */ jsx(CardTitle, { children: r.title })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: r.desc }) })
            ] }, i);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-primary/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: (page == null ? void 0 : page.ctaTitre) ?? "Une question sur les tarifs ?" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto", children: (page == null ? void 0 : page.ctaTexte) ?? "N'hésitez pas à me poser vos questions lors de votre consultation." }),
          /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gap-2 bg-primary hover:bg-primary-hover", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            "Prendre rendez-vous"
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const ContactPage = () => {
  const { data: page } = useSanityPage("contact");
  const seoTitle = (page == null ? void 0 : page.seoTitle) ?? "Contact & Accès | Cabinet Dentaire Dr Meriot Marseille 4ème";
  const seoDesc = (page == null ? void 0 : page.seoDescription) ?? "Cabinet dentaire Dr Stéphanie Meriot à Marseille 4ème. 23 Bd de la Fédération, métro Chartreux. Doctolib ☎ 09 83 43 96 21. Carte Vitale, tiers payant.";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDesc,
        canonical: "/contact",
        keywords: "dentiste marseille 4 contact, cabinet dentaire marseille chartreux, dentiste marseille 13004, rendez-vous dentiste marseille, dentiste aix-en-provence, cabinet dentaire aubagne, dentiste la ciotat, dentiste vitrolles, dentiste cassis, dentiste marignane, dentiste gardanne, dentiste martigues, dentiste istres, dentiste salon-de-provence, dentiste allauch, plan-de-cuques, les pennes-mirabeau, septèmes-les-vallons, bouc-bel-air, cabriès, simiane-collongue, meyreuil, fuveau, rousset, éguilles, ventabren, carry-le-rouet, sausset-les-pins, châteauneuf-les-martigues, gignac-la-nerthe, gémenos, carnoux, roquefort-la-bédoule, ceyreste, roquevaire, auriol, la destrousse, peypin, la bouilladisse, trets, saint-maximin, fos-sur-mer, port-de-bouc, berre-l'étang, rognac, velaux, miramas, saint-chamas, saint-mitre-les-remparts, pélissanne, lançon-provence, la fare-les-oliviers, coudoux, eyguières, lambesc, grans, PACA"
      }
    ),
    /* @__PURE__ */ jsx(FloatingCTA, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { className: "pt-20", children: [
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-gradient-soft", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6", children: (page == null ? void 0 : page.heroTitle) ?? "Contact & Accès" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: (page == null ? void 0 : page.heroSubtitle) ?? "Le cabinet du Dr Stéphanie Mériot est situé à Marseille 4ème, à proximité du métro Chartreux. Nous accueillons des patients de Marseille et de toute la région PACA." })
        ] }) }),
        /* @__PURE__ */ jsx(Contact, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const glossaryTerms = [
  {
    term: "Alvéolyse",
    definition: "Destruction de l'os alvéolaire entourant la dent, signe majeur de la parodontite."
  },
  {
    term: "Biofilm buccal",
    definition: "Communauté bactérienne organisée (plaque dentaire) responsable de l'inflammation gingivale."
  },
  {
    term: "Cément",
    definition: "Tissu recouvrant la racine dentaire, cible du surfaçage radiculaire."
  },
  {
    term: "Déchaussement dentaire",
    definition: "Rétraction de la gencive exposant la racine, souvent causée par une parodontite ou un brossage agressif."
  },
  {
    term: "Dysbiose",
    definition: "Déséquilibre de la flore bactérienne buccale menant à la maladie parodontale."
  },
  {
    term: "Gingivite",
    definition: "Inflammation réversible de la gencive, premier stade de la maladie parodontale."
  },
  {
    term: "Greffe gingivale",
    definition: "Chirurgie visant à recouvrir une racine exposée ou épaissir la gencive fragilisée."
  },
  {
    term: "Halitose",
    definition: "Mauvaise haleine chronique, souvent liée à des bactéries sous-gingivales."
  },
  {
    term: "Ligament parodontal",
    definition: "Tissu conjonctif reliant la dent à l'os alvéolaire, assurant l'ancrage dentaire."
  },
  {
    term: "Maintenance parodontale",
    definition: "Suivi régulier après traitement pour prévenir les récidives de la maladie."
  },
  {
    term: "Mobilité dentaire",
    definition: "Mouvement anormal d'une dent dans son alvéole, signe de perte osseuse avancée."
  },
  {
    term: "Parodonte",
    definition: "Ensemble des tissus de soutien de la dent : gencive, os, cément et ligament."
  },
  {
    term: "Parodontite",
    definition: "Maladie inflammatoire détruisant les tissus de soutien de la dent, pouvant mener à sa perte."
  },
  {
    term: "Poche parodontale",
    definition: "Espace pathologique entre la gencive et la dent où s'accumulent les bactéries."
  },
  {
    term: "Récession gingivale",
    definition: "Retrait de la gencive vers la racine, exposant une partie normalement recouverte."
  },
  {
    term: "Régénération tissulaire guidée (RTG)",
    definition: "Technique chirurgicale favorisant la repousse de l'os et du ligament parodontal."
  },
  {
    term: "Sondage parodontal",
    definition: "Examen mesurant la profondeur des poches pour évaluer la sévérité de la maladie."
  },
  {
    term: "Surfaçage radiculaire",
    definition: "Thérapeutique non chirurgicale visant à assainir la racine dentaire sous la gencive."
  },
  {
    term: "Tartre sous-gingival",
    definition: "Dépôt calcifié situé sous la gencive, réservoir de bactéries pathogènes."
  }
];
const ParoGlossary = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6", children: [
        /* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Lexique" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Glossaire de la Parodontie" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Comprendre les termes clés utilisés en parodontologie pour mieux appréhender votre traitement." })
    ] }),
    /* @__PURE__ */ jsx("dl", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: glossaryTerms.map((item) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-card rounded-xl p-6 shadow-soft border border-border/50 hover:border-primary/30 transition-colors",
        children: [
          /* @__PURE__ */ jsx("dt", { className: "font-bold text-lg text-primary mb-2", children: item.term }),
          /* @__PURE__ */ jsx("dd", { className: "text-muted-foreground leading-relaxed", children: item.definition })
        ]
      },
      item.term
    )) })
  ] }) });
};
const FAQSchema = ({ faqs, pageUrl }) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      })),
      ...pageUrl && { "url": pageUrl }
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById("faq-schema");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [faqs, pageUrl]);
  return null;
};
const BreadcrumbSchema = ({ items }) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "breadcrumb-schema";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById("breadcrumb-schema");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [items]);
  return null;
};
const defaultFAQs$1 = [
  { question: "Qu'est-ce que la parodontie ?", answer: "La parodontie est la spécialité dentaire qui traite les maladies des gencives et des tissus de soutien des dents (os alvéolaire, ligament parodontal). Elle prend en charge la gingivite, la parodontite et le déchaussement dentaire." },
  { question: "Comment savoir si j'ai une maladie des gencives ?", answer: "Les signes d'alerte incluent : gencives qui saignent au brossage, gencives rouges ou gonflées, mauvaise haleine persistante, déchaussement ou mobilité des dents, sensibilité au niveau des collets. Consultez rapidement si vous observez ces symptômes." },
  { question: "Le traitement parodontal fait-il mal ?", answer: "Les traitements parodontaux sont réalisés sous anesthésie locale pour garantir votre confort. Le surfaçage radiculaire est indolore pendant l'intervention. Une légère sensibilité peut persister quelques jours après, facilement soulagée par des antalgiques." },
  { question: "Combien coûte un traitement parodontal à Marseille ?", answer: "Le coût varie selon la sévérité de la maladie. Le Dr Meriot est conventionnée secteur 1, garantissant des tarifs maîtrisés. Un devis détaillé vous est remis après le bilan parodontal initial. Une partie des soins est prise en charge par l'Assurance Maladie." },
  { question: "La parodontite est-elle réversible ?", answer: "La gingivite est totalement réversible avec un traitement adapté. La parodontite entraîne une perte osseuse irréversible, mais le traitement permet de stopper l'évolution de la maladie, de préserver les dents et de retrouver des gencives saines." },
  { question: "Quels sont les facteurs de risque de la parodontite ?", answer: "Les principaux facteurs sont : le tabac (risque multiplié par 3), le diabète mal équilibré, le stress, certains médicaments, la génétique, et une hygiène bucco-dentaire insuffisante. Un suivi régulier permet de prévenir et dépister précocement." }
];
const defaultSymptomes = [
  { title: "Gencives qui saignent", desc: "Au brossage, lors du passage du fil dentaire, ou même spontanément. C'est souvent le premier signe d'une gingivite." },
  { title: "Gencives gonflées ou rouges", desc: "Une inflammation visible, des gencives sensibles au toucher, ou une couleur rouge foncé au lieu de rose pâle." },
  { title: "Mauvaise haleine persistante", desc: "Une halitose chronique peut être causée par des bactéries sous la gencive." },
  { title: "Déchaussement ou mobilité", desc: "Racines apparentes, dents qui bougent, espaces entre les dents qui s'élargissent avec tassements alimentaires." }
];
const defaultGingiviteItems = [
  "des gencives rouges, gonflées,",
  "des saignements au brossage,",
  "parfois une mauvaise haleine."
];
const defaultParodontiteItems = [
  "un déchaussement des dents,",
  "leur mobilité,",
  "des rétractations de la gencive,",
  "des infections ou des abcès."
];
const defaultTraitements = [
  { icon: "Search", step: "1", title: "Un diagnostic complet pour bien vous accompagner", desc: "Avant tout traitement, nous réalisons un examen précis de vos gencives et de l'os autour des dents. Cela comprend :", items: ["un examen clinique détaillé,", "la mesure des poches parodontales,", "l'évaluation de la mobilité des dents,", "l'analyse de la plaque et de l'inflammation,", "et des radiographies."], note: "Ce bilan complet permet de définir un plan de soins personnalisé et sécurisé, adapté à votre situation et à votre confort." },
  { icon: "Sparkles", step: "2", title: "Le détartrage et l'accompagnement à l'hygiène", desc: "La première étape du traitement consiste à éliminer la plaque dentaire et le tartre, et à vous accompagner dans l'amélioration de votre hygiène bucco-dentaire au quotidien.", items: ["Détartrage professionnel complet", "Conseils personnalisés de brossage", "Choix des outils adaptés (brossettes, fil dentaire)"], note: null },
  { icon: "Scissors", step: "3", title: "Le surfaçage radiculaire : un nettoyage en profondeur", desc: "Si nécessaire, nous réalisons un surfaçage radiculaire sous anesthésie locale. Ce soin consiste à nettoyer en profondeur sous la gencive pour éliminer les bactéries et le tartre qui se sont accumulés sur les racines des dents.", items: ["Indolore (sous anesthésie locale)", "Réalisé en 2 à 4 séances selon les cas", "Permet de réduire les poches parodontales"], note: null },
  { icon: "UserCheck", step: "4", title: "La chirurgie parodontale (si nécessaire)", desc: "Dans les cas les plus avancés, une chirurgie parodontale peut être proposée pour accéder directement aux racines et à l'os.", items: ["Réduction chirurgicale des poches profondes", "Greffe gingivale pour recouvrir les racines exposées", "Régénération osseuse guidée"], note: null },
  { icon: "ClipboardCheck", step: "5", title: "Le suivi parodontal : la clé du succès à long terme", desc: "Le traitement parodontal ne s'arrête pas après les soins. Un suivi régulier est essentiel.", items: ["Détartrages professionnels tous les 3 à 6 mois", "Contrôle de l'état des gencives", "Ajustement des conseils d'hygiène"], note: null }
];
const breadcrumbItems$2 = [
  { name: "Accueil", url: "https://www.dr-meriot-chirurgien-dentiste.fr/" },
  { name: "Parodontie", url: "https://www.dr-meriot-chirurgien-dentiste.fr/parodontie" }
];
const iconMap = {
  Search,
  Sparkles,
  Scissors,
  UserCheck,
  ClipboardCheck
};
const Parodontie = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("parodontie");
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const faqs = (page == null ? void 0 : page.faqList) ?? defaultFAQs$1;
  const symptomes = (page == null ? void 0 : page.symptomesList) ?? defaultSymptomes;
  const gingiviteItems = (page == null ? void 0 : page.gingiviteItems) ?? defaultGingiviteItems;
  const parodontiteItems = (page == null ? void 0 : page.parodontiteItems) ?? defaultParodontiteItems;
  const traitements = (page == null ? void 0 : page.traitementsList) ?? defaultTraitements;
  const seoTitle = (page == null ? void 0 : page.seoTitle) ?? "Parodontie Marseille & PACA | Dr Stéphanie Meriot - Spécialiste Gencives";
  const seoDesc = (page == null ? void 0 : page.seoDescription) ?? `Spécialiste parodontie à Marseille et région PACA : Pays d'Aix, Aubagne, La Ciotat, Côte Bleue, Étang de Berre. Traitement gingivite et parodontite. ☎ ${tel}`;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDesc,
        canonical: "/parodontie",
        keywords: "parodontie marseille, parodontologue marseille, gingivite traitement, parodontite soins, déchaussement dentaire, saignement gencives, surfaçage radiculaire, greffe gingivale"
      }
    ),
    /* @__PURE__ */ jsx(FAQSchema, { faqs: faqs.map((f) => ({ question: f.question, answer: f.reponse ?? f.answer ?? "" })), pageUrl: "https://www.dr-meriot-chirurgien-dentiste.fr/parodontie" }),
    /* @__PURE__ */ jsx(BreadcrumbSchema, { items: breadcrumbItems$2 }),
    /* @__PURE__ */ jsx(FloatingCTA, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { className: "pt-20", children: [
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-soft", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6", children: [
            /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Spécialité" })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6", children: (page == null ? void 0 : page.heroTitle) ?? "Parodontie à Marseille" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: (page == null ? void 0 : page.heroSubtitle) ?? "Spécialiste en parodontie, je prends soin de la santé de vos gencives et des tissus de soutien de vos dents. Formation approfondie à l'Académie de paro à Aix-en-Provence." })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-center", children: (page == null ? void 0 : page.definitionTitre) ?? "Qu'est-ce que la parodontie ?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mb-6", children: (page == null ? void 0 : page.definitionTexte1) ?? "La parodontie est la spécialité dentaire qui traite les maladies des gencives et des tissus de soutien des dents (os, ligament). Ces tissus forment le parodonte, l'ensemble des structures qui ancrent vos dents dans votre mâchoire." }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: (page == null ? void 0 : page.definitionTexte2) ?? "Sans traitement, les maladies parodontales peuvent entraîner un déchaussement et même la perte de vos dents. Heureusement, une prise en charge précoce permet de stabiliser et d'améliorer votre santé parodontale." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center", children: (page == null ? void 0 : page.symptomesTitre) ?? "Symptômes à surveiller" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: symptomes.map((s, i) => /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "h-6 w-6 text-accent flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: s.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: s.desc })
            ] })
          ] }) }) }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-center", children: (page == null ? void 0 : page.maladiesTitre) ?? "Les maladies parodontales : comprendre simplement" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-12 text-center max-w-3xl mx-auto", children: (page == null ? void 0 : page.maladiesIntro) ?? "Les maladies parodontales touchent les tissus qui entourent et soutiennent les dents : la gencive et l'os. Elles sont causées par l'accumulation de bactéries autour des dents. On distingue deux étapes : la gingivite et la parodontite." }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-accent/5 rounded-2xl p-8 border border-accent/20", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-accent", children: (page == null ? void 0 : page.gingiviteTitre) ?? "La gingivite : le premier signe d'alerte" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: (page == null ? void 0 : page.gingiviteTexte) ?? "La gingivite est une inflammation de la gencive. Elle peut se manifester par :" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-muted-foreground mb-6", children: gingiviteItems.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-accent mt-1", children: "•" }),
                item
              ] }, i)) }),
              /* @__PURE__ */ jsx("div", { className: "bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-800", children: /* @__PURE__ */ jsx("p", { className: "text-green-800 dark:text-green-200 font-medium", children: (page == null ? void 0 : page.gingiviteNote) ?? "La bonne nouvelle : la gingivite est totalement réversible. Un nettoyage professionnel et de bonnes habitudes d'hygiène suffisent généralement pour retrouver une gencive saine." }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-primary/5 rounded-2xl p-8 border border-primary/20", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-primary", children: (page == null ? void 0 : page.parodontiteTitre) ?? "La parodontite : quand l'inflammation va plus loin" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: (page == null ? void 0 : page.parodontiteTexte) ?? "Si la gingivite n'est pas traitée, l'inflammation peut progresser vers les tissus plus profonds. On parle alors de parodontite. Cette maladie peut provoquer :" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-muted-foreground mb-6", children: parodontiteItems.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary mt-1", children: "•" }),
                item
              ] }, i)) }),
              /* @__PURE__ */ jsx("div", { className: "bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800", children: /* @__PURE__ */ jsx("p", { className: "text-amber-800 dark:text-amber-200 font-medium", children: (page == null ? void 0 : page.parodontiteNote) ?? "La parodontite entraîne une perte de l'os qui soutient les dents. Cette perte est irréversible, mais le traitement permet de stopper l'évolution de la maladie et de préserver les dents." }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: (page == null ? void 0 : page.traitementsTitre) ?? "Les traitements parodontaux : comment soigne-t-on les gencives ?" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: (page == null ? void 0 : page.traitementsIntro) ?? "Les maladies des gencives se soignent très bien lorsqu'elles sont prises en charge à temps. Les traitements parodontaux sont réalisés de façon douce, progressive et toujours adaptée à votre confort. L'objectif : stopper l'inflammation, préserver vos dents et retrouver une bouche saine et sereine." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-8", children: traitements.map((step, i) => {
            const iconNames = ["Search", "Sparkles", "Scissors", "UserCheck", "ClipboardCheck"];
            const colors = [
              { color: "bg-primary/10", iconColor: "text-primary", badgeBg: "bg-primary" },
              { color: "bg-accent/10", iconColor: "text-accent", badgeBg: "bg-accent" },
              { color: "bg-primary/10", iconColor: "text-primary", badgeBg: "bg-primary" },
              { color: "bg-accent/10", iconColor: "text-accent", badgeBg: "bg-accent" },
              { color: "bg-primary/10", iconColor: "text-primary", badgeBg: "bg-primary" }
            ];
            const iconName = step.icon ?? iconNames[i] ?? "Search";
            const Icon = iconMap[iconName] ?? Search;
            const c = colors[i] ?? colors[0];
            return /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl p-8 shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: `p-4 ${c.color} rounded-xl flex-shrink-0`, children: /* @__PURE__ */ jsx(Icon, { className: `h-8 w-8 ${c.iconColor}` }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsx("span", { className: `${c.badgeBg} text-white text-sm font-bold px-3 py-1 rounded-full`, children: step.step }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: step.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: step.desc }),
                /* @__PURE__ */ jsx("ul", { className: "grid md:grid-cols-2 gap-2 text-muted-foreground", children: step.items.map((item, j) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 ${c.iconColor === "text-primary" ? "bg-primary" : "bg-accent"} rounded-full` }),
                  item
                ] }, j)) }),
                step.note && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-4 italic", children: step.note })
              ] })
            ] }) }, i);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-center", children: (page == null ? void 0 : page.faqTitre) ?? "Questions fréquentes sur la parodontie" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, i) => /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-xl p-6 shadow-soft", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: faq.question }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: faq.reponse ?? faq.answer })
          ] }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx(ParoGlossary, {}),
        /* @__PURE__ */ jsx("section", { className: "py-12 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: (page == null ? void 0 : page.crosslinksTitre) ?? "Découvrez nos autres spécialités" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/implantologie", className: "bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Implantologie" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Remplacez vos dents manquantes par des implants dentaires durables et esthétiques." })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/esthetique", className: "bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Esthétique dentaire" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Retrouvez un sourire éclatant grâce à nos solutions esthétiques personnalisées." })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-accent/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: (page == null ? void 0 : page.ctaTitre) ?? "Prenez soin de vos gencives" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto", children: (page == null ? void 0 : page.ctaTexte) ?? "N'attendez pas que les symptômes s'aggravent. Plus le diagnostic est précoce, plus le traitement est simple et efficace." }),
          /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gap-2 bg-primary hover:bg-primary-hover", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            "Prendre rendez-vous"
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const defaultFAQs = [
  { question: "Qu'est-ce qu'un implant dentaire ?", answer: "Un implant dentaire est une racine artificielle en titane placée dans l'os de la mâchoire pour remplacer une dent manquante." },
  { question: "La pose d'implant dentaire est-elle douloureuse ?", answer: "L'intervention se fait sous anesthésie locale, vous ne ressentez aucune douleur pendant l'acte." },
  { question: "Combien coûte un implant dentaire à Marseille ?", answer: "Le tarif d'un implant dentaire au cabinet du Dr Meriot est à partir de 950€ pour l'implant, auquel s'ajoute la couronne." },
  { question: "Quelle est la durée de vie d'un implant dentaire ?", answer: "Avec un bon entretien, un implant dentaire peut durer toute une vie. Le taux de succès dépasse 95% à 10 ans." },
  { question: "Peut-on poser un implant si l'on manque d'os ?", answer: "Oui, une greffe osseuse peut être réalisée avant ou pendant la pose de l'implant." },
  { question: "Quel est le lien entre parodontie et implantologie ?", answer: "La santé des gencives est essentielle pour la réussite des implants." }
];
const defaultAvantages = [
  { title: "Solution durable", desc: "Contrairement aux prothèses amovibles, l'implant est fixe et peut durer toute une vie avec un bon entretien." },
  { title: "Préserve l'os de la mâchoire", desc: "L'implant stimule l'os, évitant sa résorption qui survient naturellement après la perte d'une dent." },
  { title: "Confort et esthétique naturelle", desc: "L'implant se comporte comme une dent naturelle : aucune gêne, apparence naturelle, confort total." },
  { title: "Pas de dommage aux dents adjacentes", desc: "Contrairement au bridge, on ne touche pas aux dents voisines pour remplacer une dent manquante." }
];
const defaultEtapes = [
  { step: "1", title: "Consultation et bilan implantaire", desc: "Examen clinique complet, radiographies 3D pour évaluer la qualité et la quantité d'os disponible." },
  { step: "2", title: "Préparation osseuse (si nécessaire)", desc: "Si le volume osseux est insuffisant, une greffe osseuse peut être nécessaire." },
  { step: "3", title: "Pose de l'implant en titane", desc: "Intervention chirurgicale sous anesthésie locale (indolore). Durée : 30 min à 1h par implant." },
  { step: "4", title: "Ostéo-intégration et cicatrisation", desc: "L'implant doit s'intégrer à l'os. Cette phase dure 3 à 6 mois." },
  { step: "5", title: "Pose de la couronne définitive", desc: "Empreintes pour réaliser votre couronne définitive sur mesure." },
  { step: "6", title: "Suivi et maintenance implantaire", desc: "Contrôles réguliers pour la longévité de votre implant." }
];
const defaultInfos = [
  { title: "Douleur et confort", desc: "L'intervention se fait sous anesthésie locale. Les suites sont bien tolérées." },
  { title: "Tarif implant dentaire", desc: "À partir de 950€ par implant (hors couronne). Devis détaillé lors de la consultation." },
  { title: "Taux de réussite des implants", desc: "Le taux de succès dépasse 95% à 10 ans." }
];
const breadcrumbItems$1 = [
  { name: "Accueil", url: "https://www.dr-meriot-chirurgien-dentiste.fr/" },
  { name: "Implantologie", url: "https://www.dr-meriot-chirurgien-dentiste.fr/implantologie" }
];
const Implantologie = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("implantologie");
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const faqs = (page == null ? void 0 : page.faqList) ?? defaultFAQs;
  const avantages = (page == null ? void 0 : page.avantagesList) ?? defaultAvantages;
  const etapes = (page == null ? void 0 : page.etapesList) ?? defaultEtapes;
  const infos = (page == null ? void 0 : page.infosList) ?? defaultInfos;
  const seoTitle = (page == null ? void 0 : page.seoTitle) ?? "Implants Dentaires Marseille | Dr Stéphanie Meriot - Implantologie";
  const seoDesc = (page == null ? void 0 : page.seoDescription) ?? `Pose d'implants dentaires à Marseille 4ème par le Dr Meriot. Formation IFPIO. Devis gratuit. ☎ ${tel}`;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDesc,
        canonical: "/implantologie",
        keywords: "implant dentaire marseille, implantologie marseille, pose implant dentaire, chirurgie implantaire, implantologue marseille 4"
      }
    ),
    /* @__PURE__ */ jsx(FAQSchema, { faqs: faqs.map((f) => ({ question: f.question, answer: f.reponse ?? f.answer ?? "" })), pageUrl: "https://www.dr-meriot-chirurgien-dentiste.fr/implantologie" }),
    /* @__PURE__ */ jsx(BreadcrumbSchema, { items: breadcrumbItems$1 }),
    /* @__PURE__ */ jsx(FloatingCTA, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { className: "pt-20", children: [
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-soft", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6", children: [
            /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Spécialité" })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6", children: (page == null ? void 0 : page.heroTitle) ?? "Implantologie à Marseille" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: (page == null ? void 0 : page.heroSubtitle) ?? "Solution moderne et durable pour remplacer vos dents manquantes. Formation spécialisée à l'IFPIO Marseille." })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-center", children: (page == null ? void 0 : page.definitionTitre) ?? "Qu'est-ce qu'un implant dentaire ?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mb-6", children: (page == null ? void 0 : page.definitionTexte1) ?? "Un implant dentaire est une racine artificielle en titane qui est placée chirurgicalement dans l'os de la mâchoire." }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: (page == null ? void 0 : page.definitionTexte2) ?? "Le titane est un matériau biocompatible qui s'intègre naturellement à l'os (ostéo-intégration), offrant une stabilité comparable à celle d'une dent naturelle." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center", children: (page == null ? void 0 : page.avantagesTitre) ?? "Les avantages des implants dentaires" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: avantages.map((a, i) => /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "h-6 w-6 text-primary flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: a.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: a.desc })
            ] })
          ] }) }) }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center", children: (page == null ? void 0 : page.etapesTitre) ?? "Les étapes de la pose d'implant dentaire" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-8", children: etapes.map((e, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-start", children: [
            /* @__PURE__ */ jsx("div", { className: `p-3 ${i % 2 === 0 ? "bg-primary/10" : "bg-accent/10"} rounded-xl flex-shrink-0`, children: /* @__PURE__ */ jsx("span", { className: `${i % 2 === 0 ? "text-primary" : "text-accent"} font-bold text-xl`, children: e.step }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3", children: e.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: e.desc })
            ] })
          ] }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-primary/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-center", children: (page == null ? void 0 : page.infosTitre) ?? "Informations pratiques sur les implants" }),
          /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: infos.map((info, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Info, { className: "h-5 w-5 text-primary flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1", children: info.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: info.desc })
            ] })
          ] }, i)) }) }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsxs("div", { className: "bg-accent/5 rounded-2xl p-8 border border-accent/20", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: (page == null ? void 0 : page.lienParoTitre) ?? "Parodontie et implantologie : un duo essentiel" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: (page == null ? void 0 : page.lienParoTexte) ?? "La réussite d'un implant dépend directement de la santé de vos gencives et de votre os." }),
          /* @__PURE__ */ jsx(Link, { to: "/parodontie", className: "inline-flex items-center text-primary font-medium hover:underline", children: "En savoir plus sur la parodontie →" })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-center", children: (page == null ? void 0 : page.faqTitre) ?? "Questions fréquentes sur les implants" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, i) => /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-xl p-6 shadow-soft", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: faq.question }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: faq.reponse ?? faq.answer })
          ] }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: (page == null ? void 0 : page.ctaTitre) ?? "Retrouvez votre sourire complet" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto", children: (page == null ? void 0 : page.ctaTexte) ?? "Prenez rendez-vous pour un bilan implantaire complet. Je vous expliquerai les options adaptées à votre situation." }),
          /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gap-2 bg-primary hover:bg-primary-hover", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            "Prendre rendez-vous"
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const defaultSolutions = [
  { title: "Blanchiment dentaire professionnel", desc: "Éclaircissement professionnel et sécurisé de vos dents pour retrouver une teinte lumineuse et naturelle.", items: ["Blanchiment ambulatoire (gouttières sur mesure à porter à domicile)", "Blanchiment au fauteuil (résultat immédiat en une séance)", "Traitement adapté à la sensibilité de vos dents"], color: "accent" },
  { title: "Facettes dentaires en céramique", desc: "Fines coquilles en céramique collées sur la face visible des dents pour corriger leur forme, leur couleur ou leur alignement.", items: ["Correction des dents tachées, ébréchées ou mal alignées", "Résultat naturel et personnalisé selon votre visage", "Longévité exceptionnelle (10-15 ans en moyenne)"], color: "primary" },
  { title: "Composites esthétiques", desc: "Résine composite de haute qualité pour restaurer ou embellir vos dents.", items: ["Réparation esthétique des dents ébréchées", "Fermeture des espaces entre les dents (diastèmes)", "Résultat immédiat en une seule séance"], color: "accent" },
  { title: "Harmonisation du sourire", desc: "Analyse globale de votre sourire pour créer un sourire harmonieux et adapté à votre visage.", items: ["Étude esthétique personnalisée", "Simulation numérique du résultat (si possible)", "Plan de traitement sur mesure"], color: "primary" }
];
const breadcrumbItems = [
  { name: "Accueil", url: "https://www.dr-meriot-chirurgien-dentiste.fr/" },
  { name: "Esthétique dentaire", url: "https://www.dr-meriot-chirurgien-dentiste.fr/esthetique" }
];
const Esthetique = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("esthetique");
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const solutions = (page == null ? void 0 : page.solutionsList) ?? defaultSolutions;
  const seoTitle = (page == null ? void 0 : page.seoTitle) ?? "Esthétique Dentaire Marseille | Blanchiment & Facettes | Dr Meriot";
  const seoDesc = (page == null ? void 0 : page.seoDescription) ?? `Blanchiment dentaire, facettes et composites esthétiques à Marseille 4ème. Retrouvez un sourire éclatant avec le Dr Meriot. ☎ ${tel}`;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDesc,
        canonical: "/esthetique",
        keywords: "esthétique dentaire marseille, blanchiment dentaire marseille, facettes dentaires, composites esthétiques, sourire harmonieux"
      }
    ),
    /* @__PURE__ */ jsx(BreadcrumbSchema, { items: breadcrumbItems }),
    /* @__PURE__ */ jsx(FloatingCTA, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { className: "pt-20", children: [
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-soft", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Esthétique" })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6", children: (page == null ? void 0 : page.heroTitle) ?? "Esthétique dentaire à Marseille" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: (page == null ? void 0 : page.heroSubtitle) ?? "Retrouvez un sourire éclatant et harmonieux grâce à des solutions esthétiques douces et personnalisées. Sublimez votre sourire en toute sérénité." })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-center", children: (page == null ? void 0 : page.introTitre) ?? "Un sourire qui vous ressemble" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mb-6", children: (page == null ? void 0 : page.introTexte1) ?? "L'esthétique dentaire ne se limite pas à avoir des dents blanches. C'est avant tout retrouver confiance en soi et se sentir bien avec son sourire." }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: (page == null ? void 0 : page.introTexte2) ?? "Mon approche est naturelle et respectueuse de vos tissus dentaires. Je privilégie toujours les techniques les moins invasives pour préserver au maximum votre émail." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center", children: (page == null ? void 0 : page.solutionsTitre) ?? "Nos solutions d'esthétique dentaire" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-8", children: solutions.map((s, i) => {
            const color = s.color ?? (i % 2 === 0 ? "accent" : "primary");
            return /* @__PURE__ */ jsx(Card, { className: "shadow-soft hover-lift transition-all duration-300", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: `p-3 bg-${color}/10 rounded-xl flex-shrink-0`, children: /* @__PURE__ */ jsx(Sparkles, { className: `h-6 w-6 text-${color}` }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mb-3", children: s.title }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: s.desc }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: s.items.map((item, j) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: `h-5 w-5 text-${color} flex-shrink-0 mt-0.5` }),
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: item })
                ] }, j)) })
              ] })
            ] }) }) }, i);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-center", children: (page == null ? void 0 : page.approcheTitre) ?? "Une approche esthétique naturelle et respectueuse" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl p-8 shadow-soft", children: [
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-6", children: (page == null ? void 0 : page.approcheTexte1) ?? `Je crois en une esthétique naturelle qui respecte votre personnalité et vos traits. Mon objectif n'est pas de créer un sourire "parfait" standardisé, mais de sublimer votre sourire unique.` }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: (page == null ? void 0 : page.approcheTexte2) ?? "Ma philosophie : dentisterie à minima. Je privilégie toujours les techniques les moins invasives pour préserver au maximum vos tissus dentaires naturels." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-12 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: (page == null ? void 0 : page.crosslinksTitre) ?? "Découvrez nos autres spécialités" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/parodontie", className: "bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Parodontie" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Des gencives saines sont la base d'un beau sourire." })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/implantologie", className: "bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Implantologie" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Remplacez vos dents manquantes par des implants dentaires durables et esthétiques." })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-accent/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: (page == null ? void 0 : page.ctaTitre) ?? "Osez le sourire dont vous rêvez" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto", children: (page == null ? void 0 : page.ctaTexte) ?? "Prenez rendez-vous pour une consultation esthétique. Ensemble, nous créerons le sourire qui vous correspond." }),
          /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gap-2 bg-primary hover:bg-primary-hover", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            "Prendre rendez-vous"
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const defaultDiplomes = [
  "Docteur en chirurgie dentaire - Faculté d'odontologie de Marseille",
  "Formation spécialisée en Parodontologie - IFPIO Marseille",
  "Formation complémentaire en Parodontologie - Académie de paro, Aix-en-Provence",
  "Formation en Implantologie - IFPIO Marseille"
];
const MentionsLegales = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("legal");
  const nom = (global == null ? void 0 : global.nom_praticien) ?? "Dr Stéphanie Meriot";
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const adresse = (global == null ? void 0 : global.adresse) ?? "23 Boulevard de la Fédération, 13004 Marseille";
  const rpps = (page == null ? void 0 : page.rpps) ?? "10100720993";
  const diplomes = (page == null ? void 0 : page.diplomesList) ?? defaultDiplomes;
  const hebergeur = (page == null ? void 0 : page.hebergeur) ?? "Lovable.dev";
  const seoTitle = (page == null ? void 0 : page.seoTitle) ?? `Mentions Légales | Cabinet Dentaire ${nom} Marseille`;
  const seoDesc = (page == null ? void 0 : page.seoDescription) ?? `Mentions légales du cabinet dentaire ${nom}. RPPS, Ordre des Chirurgiens-Dentistes, secteur 1 conventionné, Marseille 4ème.`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDesc,
        canonical: "/mentions-legales"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "pt-20 py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8", children: (page == null ? void 0 : page.titre) ?? "Mentions légales" }),
        /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none space-y-8", children: [
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Éditeur du site" }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: nom }),
              /* @__PURE__ */ jsx("br", {}),
              "Chirurgien-dentiste",
              /* @__PURE__ */ jsx("br", {}),
              adresse.split(",").map((part, i) => /* @__PURE__ */ jsxs("span", { children: [
                part.trim(),
                /* @__PURE__ */ jsx("br", {})
              ] }, i)),
              "France"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Téléphone :" }),
              " ",
              tel,
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("strong", { children: "RPPS :" }),
              " ",
              rpps
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Autorité compétente" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Ordre National des Chirurgiens-Dentistes",
              /* @__PURE__ */ jsx("br", {}),
              "22 rue Emile Ménier",
              /* @__PURE__ */ jsx("br", {}),
              "75116 Paris",
              /* @__PURE__ */ jsx("br", {}),
              "Tél : 01 44 34 77 77"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Diplômes et qualifications" }),
            /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6 space-y-2", children: diplomes.map((d, i) => /* @__PURE__ */ jsx("li", { children: d }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Conditions d'exercice" }),
            /* @__PURE__ */ jsx("p", { children: (page == null ? void 0 : page.conditionsTexte) ?? `Le ${nom} exerce en secteur 1 (tarifs conventionnés). Inscrite à l'Ordre sous le numéro RPPS ${rpps}.` }),
            /* @__PURE__ */ jsx("p", { children: "Assurance responsabilité civile professionnelle conformément à l'article L.1142-2 du Code de la Santé Publique." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Règles déontologiques" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Soumise au Code de déontologie des chirurgiens-dentistes :",
              " ",
              /* @__PURE__ */ jsx("a", { href: "https://www.ordre-chirurgiens-dentistes.fr/", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "www.ordre-chirurgiens-dentistes.fr" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Hébergement du site" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Hébergé par ",
              hebergeur,
              " — ",
              /* @__PURE__ */ jsx("a", { href: "https://lovable.dev", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "lovable.dev" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Propriété intellectuelle" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "L'ensemble du contenu de ce site est la propriété exclusive du ",
              nom,
              ". Toute reproduction est interdite sans autorisation."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Données personnelles" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Consultez notre ",
              /* @__PURE__ */ jsx("a", { href: "/confidentialite", className: "text-primary hover:underline", children: "Politique de confidentialité" }),
              "."
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const Confidentialite = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("confidentialite");
  const nom = (global == null ? void 0 : global.nom_praticien) ?? "Dr Stéphanie Meriot";
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const adresse = (global == null ? void 0 : global.adresse) ?? "23 Boulevard de la Fédération, 13004 Marseille";
  const seoTitle = (page == null ? void 0 : page.seoTitle) ?? "Politique de Confidentialité RGPD | Dr Stéphanie Meriot Marseille";
  const seoDesc = (page == null ? void 0 : page.seoDescription) ?? "Politique de confidentialité et protection des données personnelles (RGPD) du cabinet dentaire Dr Stéphanie Meriot à Marseille 4ème.";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDesc,
        canonical: "/confidentialite"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "pt-20 py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8", children: (page == null ? void 0 : page.titre) ?? "Politique de confidentialité" }),
        /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none space-y-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: (page == null ? void 0 : page.introTexte) ?? `Le ${nom} accorde une grande importance à la protection de vos données personnelles. Cette politique vous informe sur la collecte, l'utilisation et la protection de vos données conformément au Règlement Général sur la Protection des Données (RGPD).` }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Responsable du traitement" }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: nom }),
              /* @__PURE__ */ jsx("br", {}),
              adresse,
              /* @__PURE__ */ jsx("br", {}),
              "Téléphone : ",
              tel
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Données collectées" }),
            /* @__PURE__ */ jsx("p", { children: "Dans le cadre de votre prise en charge médicale, nous collectons :" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Données d'identification :" }),
                " nom, prénom, date de naissance, adresse, numéro de téléphone, email"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Données de santé :" }),
                " antécédents médicaux, traitements en cours, examens, radiographies, soins prodigués"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Données administratives :" }),
                " numéro de Sécurité sociale, mutuelle, modalités de paiement"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Finalités du traitement" }),
            /* @__PURE__ */ jsx("p", { children: "Vos données sont collectées pour :" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
              /* @__PURE__ */ jsx("li", { children: "Assurer votre suivi médical et la continuité des soins" }),
              /* @__PURE__ */ jsx("li", { children: "Établir des devis, factures et documents de remboursement" }),
              /* @__PURE__ */ jsx("li", { children: "Respecter nos obligations légales et réglementaires" }),
              /* @__PURE__ */ jsx("li", { children: "Gérer les prises de rendez-vous (via Doctolib notamment)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Base légale du traitement" }),
            /* @__PURE__ */ jsx("p", { children: "Le traitement de vos données est fondé sur :" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Intérêt légitime :" }),
                " votre suivi médical et la gestion du cabinet"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Obligation légale :" }),
                " tenue du dossier médical, facturation"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Consentement :" }),
                " pour certains traitements spécifiques (communication par email par exemple)"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Destinataires des données" }),
            /* @__PURE__ */ jsx("p", { children: "Vos données peuvent être transmises à :" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
              /* @__PURE__ */ jsx("li", { children: "L'Assurance Maladie et votre mutuelle (pour remboursement)" }),
              /* @__PURE__ */ jsx("li", { children: "Des professionnels de santé (si nécessaire pour votre prise en charge)" }),
              /* @__PURE__ */ jsx("li", { children: "Doctolib (pour la gestion des rendez-vous, sous réserve de leur propre politique de confidentialité)" })
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Aucune donnée n'est vendue ou cédée à des tiers à des fins commerciales." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Durée de conservation" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Conformément à la réglementation en vigueur, vos données médicales sont conservées pendant ",
              /* @__PURE__ */ jsx("strong", { children: "20 ans" }),
              " à compter de votre dernière consultation."
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Les données administratives (factures, devis) sont conservées pendant la durée légale applicable." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Vos droits" }),
            /* @__PURE__ */ jsx("p", { children: "Vous disposez des droits suivants concernant vos données personnelles :" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Droit d'accès :" }),
                " obtenir une copie de vos données"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Droit de rectification :" }),
                " corriger des données inexactes"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Droit d'opposition :" }),
                " vous opposer à certains traitements"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Droit à la limitation :" }),
                " limiter le traitement de vos données"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Droit à l'effacement :" }),
                " sous réserve des obligations légales de conservation"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Pour exercer vos droits, contactez-nous par téléphone au",
              " ",
              /* @__PURE__ */ jsx("strong", { children: tel }),
              " ou sur place au cabinet."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Sécurité des données" }),
            /* @__PURE__ */ jsx("p", { children: "Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité et la confidentialité de vos données (accès restreint, sauvegarde sécurisée, chiffrement si applicable)." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Cookies" }),
            /* @__PURE__ */ jsx("p", { children: "Ce site n'utilise pas de cookies publicitaires ou de suivi intrusif. Seuls des cookies strictement nécessaires au fonctionnement du site peuvent être utilisés (par exemple, pour la prise de rendez-vous via Doctolib)." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Contact" }),
            /* @__PURE__ */ jsx("p", { children: "Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits, contactez-nous :" }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: nom }),
              /* @__PURE__ */ jsx("br", {}),
              adresse,
              /* @__PURE__ */ jsx("br", {}),
              "Tél : ",
              tel
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos droits n'ont pas été respectés." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-8", children: [
            "Dernière mise à jour : ",
            (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR")
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-muted-foreground", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-primary underline hover:text-primary/90", children: "Return to Home" })
  ] }) });
};
const blogPosts = [
  {
    slug: "gingivite-traitement-prevention",
    title: "Gingivite : Symptômes, Traitement et Prévention",
    excerpt: "La gingivite est une inflammation des gencives qui touche 80% des adultes. Découvrez comment la reconnaître, la traiter et surtout la prévenir avec les conseils du Dr Meriot.",
    category: "Parodontie",
    date: "2024-11-20",
    keywords: "gingivite, inflammation gencives, traitement gingivite, parodontie marseille",
    content: `
# Gingivite : Symptômes, Traitement et Prévention

La gingivite est l'inflammation des gencives causée par l'accumulation de plaque dentaire. C'est la maladie parodontale la plus fréquente, touchant environ 80% des adultes à un moment de leur vie.

## Les Symptômes de la Gingivite

Les signes qui doivent vous alerter :

- **Saignement des gencives** lors du brossage ou de l'utilisation du fil dentaire
- **Gencives rouges et gonflées** (au lieu de roses et fermes)
- **Mauvaise haleine persistante** (halitose)
- **Sensibilité au chaud et au froid**
- **Gencives qui se rétractent**, donnant l'impression que les dents s'allongent

## Les Causes de la Gingivite

La cause principale est **l'accumulation de plaque dentaire**, un film bactérien collant qui se forme sur les dents. Si elle n'est pas éliminée par un brossage régulier, elle se transforme en tartre et irrite les gencives.

D'autres facteurs favorisent la gingivite :
- Tabagisme
- Diabète
- Stress
- Changements hormonaux (grossesse, ménopause)
- Certains médicaments
- Mauvaise alimentation

## Traitement de la Gingivite

**La bonne nouvelle : la gingivite est réversible** si elle est traitée rapidement.

### Traitement Professionnel

Au cabinet du Dr Meriot à Marseille, le traitement comprend :

1. **Détartrage professionnel** pour éliminer la plaque et le tartre
2. **Surfaçage radiculaire** si nécessaire pour lisser les racines
3. **Instructions de brossage personnalisées**
4. **Suivi régulier** pour prévenir les récidives

### Traitement à Domicile

- Brossage 2 fois par jour pendant 2 minutes
- Utilisation quotidienne du fil dentaire
- Bain de bouche antiseptique si recommandé
- Arrêt du tabac

## Prévention : Le Meilleur Remède

Pour éviter la gingivite :

- **Hygiène rigoureuse** : brossage efficace et fil dentaire quotidien
- **Visites régulières** chez le dentiste (tous les 6 mois minimum)
- **Détartrage préventif** 1 à 2 fois par an
- **Alimentation équilibrée** riche en vitamines C et D
- **Réduction du stress**

## Quand Consulter ?

Consultez rapidement si vous observez :
- Des saignements réguliers
- Des gencives gonflées ou douloureuses
- Une mauvaise haleine persistante
- Un déchaussement dentaire

**Non traitée, la gingivite peut évoluer vers une parodontite**, maladie plus grave pouvant entraîner la perte des dents.

## Gingivite Non Traitée : Risques pour la Santé Globale

La gingivite, si elle n'est pas traitée, peut évoluer en parodontite. Les recherches récentes montrent un lien entre inflammation chronique des gencives et :

- **Risques cardiovasculaires accrus**
- **Complications du diabète**
- **Problèmes respiratoires**

[En savoir plus sur le lien gencives/santé générale](/blog/parodontite-causes-symptomes-traitement)

## Expertise du Dr Meriot en Parodontie

Le Dr Stéphanie Meriot, spécialisée en parodontologie (IFPIO Marseille, Académie de paro Aix-en-Provence), propose une approche douce et personnalisée du traitement des maladies des gencives.

### Prendre Rendez-vous

**Cabinet dentaire Dr Stéphanie Meriot**  
📍 23 Boulevard de la Fédération, 13004 Marseille  
📞 [09 83 43 96 21](tel:0983439621)  
🌐 [Prendre RDV sur Doctolib](https://www.doctolib.fr/dentiste/marseille/stephanie-meriot)

*Article rédigé par le Dr Stéphanie Meriot, chirurgien-dentiste spécialisée en parodontologie à Marseille.*
    `
  },
  {
    slug: "parodontite-causes-symptomes-traitement",
    title: "Parodontite : Causes, Symptômes et Traitements Modernes",
    excerpt: "La parodontite est une maladie grave des gencives qui peut entraîner la perte des dents. Apprenez à la reconnaître tôt et découvrez les traitements efficaces disponibles à Marseille.",
    category: "Parodontie",
    date: "2024-11-18",
    keywords: "parodontite, maladie parodontale, déchaussement dentaire, traitement parodontite marseille",
    content: `
# Parodontite : Causes, Symptômes et Traitements Modernes

La parodontite est une infection bactérienne chronique qui détruit progressivement les tissus de soutien des dents (gencives, ligament parodontal, os alvéolaire). C'est la **première cause de perte de dents chez l'adulte**.

## Qu'est-ce que la Parodontite ?

La parodontite est le stade avancé de la maladie parodontale. Elle se développe généralement après une gingivite non traitée et se caractérise par :

- La formation de **poches parodontales** (espaces entre la dent et la gencive)
- La destruction de **l'os qui soutient les dents**
- Le **déchaussement progressif des dents**
- À terme, la **mobilité puis la perte des dents**

## Les Symptômes Alarmants

Les signes qui doivent vous inquiéter :

- **Saignements spontanés** des gencives
- **Gencives qui se rétractent** (récession gingivale)
- **Dents qui bougent** ou changent de position
- **Espaces qui apparaissent** entre les dents
- **Abcès gingivaux** récurrents
- **Douleur à la mastication**
- **Mauvaise haleine persistante**
- **Sensibilité dentaire accrue**

⚠️ **Attention** : La parodontite peut être silencieuse pendant longtemps. D'où l'importance des consultations régulières.

## Les Causes de la Parodontite

### Cause Principale : Les Bactéries

L'accumulation de **plaque dentaire et de tartre** crée un environnement favorable aux bactéries pathogènes qui attaquent les tissus parodontaux.

### Facteurs Aggravants

- **Tabagisme** (facteur de risque n°1)
- **Diabète** non contrôlé
- **Prédisposition génétique**
- **Stress chronique**
- **Mauvaise hygiène bucco-dentaire**
- **Grincement des dents** (bruxisme)
- **Certaines maladies** (VIH, cancer)

## Diagnostic de la Parodontite

Au cabinet du Dr Meriot, le diagnostic comprend :

1. **Examen clinique complet** des gencives
2. **Sondage parodontal** pour mesurer les poches
3. **Radiographies** pour évaluer la perte osseuse
4. **Bilan parodontal détaillé**

## Traitements de la Parodontite

### Phase 1 : Traitement Initial (Non-Chirurgical)

**Objectif** : Éliminer l'infection et stopper la progression

- **Détartrage et surfaçage radiculaire** (nettoyage en profondeur sous les gencives)
- **Irrigation antibactérienne** des poches parodontales
- **Enseignement d'une hygiène optimale**
- **Réévaluation** après 6-8 semaines

### Phase 2 : Traitement Chirurgical (Si Nécessaire)

Pour les cas avancés :

- **Chirurgie parodontale** pour réduire les poches profondes
- **Greffes osseuses** pour régénérer l'os perdu
- **Greffes gingivales** pour recouvrir les racines exposées
- **Régénération tissulaire guidée** (RTG)

### Phase 3 : Maintenance Parodontale

**Crucial pour le succès à long terme :**

- Détartrages professionnels tous les 3-4 mois
- Contrôles réguliers
- Hygiène rigoureuse à domicile
- Suivi à vie

## Approche Moderne et Minimale Invasive

Le Dr Meriot privilégie une **approche douce et conservatrice** :

- Techniques **minimalement invasives**
- Respect des tissus
- Gestion de la douleur et du confort
- Protocoles personnalisés selon chaque patient

## Conséquences de la Parodontite Non Traitée

Au-delà de la perte des dents, la parodontite est associée à :

- **Risques cardiovasculaires** accrus
- **Complications du diabète**
- **Accouchements prématurés** chez les femmes enceintes
- **Maladies respiratoires**

## Prévention : Agir Avant qu'il ne Soit Trop Tard

- Brossage efficace 2x/jour + fil dentaire quotidien
- Visites dentaires tous les 6 mois
- Arrêt du tabac
- Contrôle du diabète
- Alimentation équilibrée

## Expertise en Parodontologie à Marseille

Le Dr Stéphanie Meriot, diplômée de l'IFPIO et de l'Académie de Parodontologie d'Aix-en-Provence, est spécialisée dans le diagnostic et le traitement des maladies parodontales.

## Expertise et Références Scientifiques

Notre pratique clinique s'appuie sur les dernières recommandations de bonnes pratiques publiées par les instances internationales de parodontologie.

### Le Protocole S3

Nous suivons strictement le guide de pratique clinique de niveau S3 pour le traitement des parodontites de stades I à III, validé par la Fédération Européenne de Parodontologie (EFP). Ce protocole garantit une approche étape par étape, de la thérapie causale à la maintenance.

[Consulter les recommandations de l'EFP (Source officielle)](https://www.efp.org/education-cpg/cpg/)

### Étude sur le Sauvetage Dentaire

Une étude majeure publiée dans le Journal of Clinical Periodontology démontre que même les dents présentant une perte osseuse sévère peuvent être conservées durablement grâce à une thérapeutique parodontale rigoureuse.

[Accéder à l'étude sur la conservation dentaire (PubMed)](https://pubmed.ncbi.nlm.nih.gov/11155182/)

## Parodontite et Santé Générale : Ce que disent les études

La parodontite n'est pas qu'un problème local. De nombreuses méta-analyses ont confirmé le lien entre l'inflammation des gencives et des pathologies systémiques graves :

### Diabète et Parodontite

Il existe une relation bidirectionnelle prouvée. Traiter une parodontite peut aider à améliorer le contrôle de la glycémie (diminution de l'HbA1c).

[Rapport de consensus EFP/International Diabetes Federation](https://www.efp.org/publications-efp/consensus-reports/diabetes/)

### Risques Cardiaques

Les patients souffrant de parodontite sévère ont un risque accru d'athérosclérose et d'événements cardiovasculaires.

[Consulter l'étude du British Dental Journal sur les risques systémiques](https://www.nature.com/articles/sj.bdj.2010.497)

### Prendre Rendez-vous

**Cabinet dentaire Dr Stéphanie Meriot**  
📍 23 Boulevard de la Fédération, 13004 Marseille  
📞 [09 83 43 96 21](tel:0983439621)  
🌐 [Prendre RDV sur Doctolib](https://www.doctolib.fr/dentiste/marseille/stephanie-meriot)

*Article rédigé par le Dr Stéphanie Meriot, chirurgien-dentiste spécialisée en parodontologie.*
    `
  },
  {
    slug: "implants-dentaires-tout-savoir",
    title: "Implants Dentaires : Guide Complet 2024",
    excerpt: "Tout ce que vous devez savoir sur les implants dentaires : procédure, avantages, durée de vie, prix. Expertise en implantologie à Marseille par le Dr Meriot.",
    category: "Implantologie",
    date: "2024-11-15",
    keywords: "implants dentaires, implantologie marseille, pose implant, remplacement dent, implant dentaire prix",
    content: `
# Implants Dentaires : Guide Complet 2024

L'implant dentaire est aujourd'hui la solution la plus fiable et durable pour remplacer une ou plusieurs dents manquantes. Avec un taux de succès de 95-98%, c'est la référence en matière de remplacement dentaire.

## Qu'est-ce qu'un Implant Dentaire ?

Un implant dentaire est une **racine artificielle en titane** insérée chirurgicalement dans l'os de la mâchoire. Il sert de support solide pour une couronne, un bridge ou une prothèse dentaire.

### Composition d'un Implant

1. **La vis en titane** (l'implant lui-même) : ancrée dans l'os
2. **Le pilier (abutment)** : relie l'implant à la couronne
3. **La couronne** : la partie visible qui ressemble à une dent naturelle

## Quand a-t-on Besoin d'un Implant ?

Les implants dentaires sont indiqués dans plusieurs situations :

- **Perte d'une dent** suite à une carie, un traumatisme ou une maladie parodontale
- **Remplacement de plusieurs dents** manquantes
- **Stabilisation d'une prothèse** complète (dentier)
- **Alternative au bridge** sans toucher aux dents adjacentes

## Avantages des Implants Dentaires

### Esthétique Naturelle
- Apparence et sensation identiques à une vraie dent
- Préserve la structure du visage
- Sourire harmonieux

### Fonction Optimale
- Mastication efficace (100% de la force de morsure restaurée)
- Prononciation claire
- Aucune restriction alimentaire

### Santé Bucco-Dentaire
- **Préservation de l'os** : l'implant stimule l'os comme une racine naturelle
- **Protection des dents voisines** : contrairement au bridge, pas besoin de les tailler
- **Durabilité exceptionnelle** : peut durer toute une vie avec un bon entretien

### Confort et Qualité de Vie
- Fixe et stable (ne bouge pas)
- Pas de gêne ni d'inconfort
- Entretien facile (brossage normal)

## La Procédure de Pose d'Implant

### Étape 1 : Consultation et Bilan (Jour 0)

- **Examen clinique complet**
- **Radiographies 3D** (cone beam) pour évaluer l'os
- **Plan de traitement personnalisé**
- Vérification de l'état de santé général

### Étape 2 : Pose de l'Implant (Chirurgie)

**Durée** : 30 minutes à 1 heure par implant  
**Anesthésie** : locale (vous ne sentez rien)

1. Incision de la gencive
2. Forage précis dans l'os
3. Insertion de l'implant en titane
4. Sutures (fils résorbables généralement)

**Post-opératoire** : légers désagréments pendant 2-3 jours (gonflement, légère douleur contrôlée par antalgiques)

### Étape 3 : Ostéointégration (3 à 6 Mois)

Période de **cicatrisation** pendant laquelle l'implant fusionne avec l'os. C'est une étape cruciale pour la solidité à long terme.

Une **prothèse provisoire** peut être posée pour l'esthétique.

### Étape 4 : Pose du Pilier et de la Couronne

Une fois l'ostéointégration complète :

1. Pose du **pilier** sur l'implant
2. Prise d'empreintes pour fabriquer la couronne sur-mesure
3. Pose de la **couronne définitive** (2 semaines plus tard)

## Suis-je un Bon Candidat ?

### Conditions Requises

✅ **Bonne santé générale**  
✅ **Gencives saines**  
✅ **Volume osseux suffisant** (sinon greffe osseuse possible)  
✅ **Non-fumeur** (ou volonté d'arrêter)  
✅ **Bonne hygiène bucco-dentaire**

### Contre-Indications Relatives

- Tabagisme important (réduit le taux de succès)
- Diabète non contrôlé
- Maladies parodontales actives (à traiter avant)
- Bruxisme sévère (grincement de dents)

### Contre-Indications Absolues

- Radiothérapie récente de la mâchoire
- Certains traitements médicamenteux (bisphosphonates à forte dose)
- Maladies osseuses graves

## Durée de Vie et Entretien

### Longévité

Avec des soins appropriés, un implant peut durer **20 à 40 ans, voire toute la vie**.

La couronne peut nécessiter un remplacement après 10-15 ans (usure naturelle).

### Entretien Quotidien

- Brossage 2 fois par jour
- Fil dentaire ou brossettes interdentaires
- Bain de bouche si recommandé

### Suivi Professionnel

- Contrôles tous les 6 mois
- Détartrage régulier
- Radiographies de contrôle

## Prix des Implants Dentaires

Le coût varie selon :

- Le nombre d'implants
- La complexité du cas
- La nécessité d'une greffe osseuse
- Le type de couronne

**Fourchette indicative** : 1 500 € à 2 500 € par implant complet (implant + pilier + couronne)

### Prise en Charge

- **Sécurité Sociale** : remboursement très limité (voir inexistant)
- **Mutuelles** : certaines prennent en charge une partie (jusqu'à 500-1000€ selon les contrats)
- **Devis détaillé** fourni lors de la consultation

## Implants vs Autres Solutions

| Critère | Implant | Bridge | Prothèse Amovible |
|---------|---------|--------|-------------------|
| **Durabilité** | 20+ ans | 10-15 ans | 5-7 ans |
| **Confort** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Esthétique** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Préservation osseuse** | ✅ Oui | ❌ Non | ❌ Non |
| **Touche dents voisines** | ❌ Non | ✅ Oui | ❌ Non |
| **Fixe** | ✅ | ✅ | ❌ |

## L'Expertise du Dr Meriot en Implantologie

Le Dr Stéphanie Meriot a suivi une **formation spécialisée en implantologie** et réalise des poses d'implants dans une approche :

- **Minimalement invasive** : techniques douces et précises
- **Personnalisée** : chaque cas est unique
- **Sécurisée** : utilisation d'imagerie 3D et protocoles stricts
- **Centrée sur le patient** : écoute, explication, confort

### Technologies Utilisées

- Scanner 3D (Cone Beam)
- Planification assistée par ordinateur
- Implants de haute qualité (titane biocompatible)

## Prendre Rendez-vous pour une Consultation

**Cabinet dentaire Dr Stéphanie Meriot**  
📍 23 Boulevard de la Fédération, 13004 Marseille  
📞 [09 83 43 96 21](tel:0983439621)  
🌐 [Prendre RDV sur Doctolib](https://www.doctolib.fr/dentiste/marseille/stephanie-meriot)

**Consultation d'implantologie** : bilan complet, devis personnalisé, réponse à toutes vos questions.

## La Péri-implantite : Une Pathologie Sous-estimée

Selon le XI European Workshop on Periodontology, la prévalence de la péri-implantite touche **environ 20% des patients implantés à 10 ans**. La prévention et le traitement précoce sont les seuls garants de la survie de vos implants.

### Facteurs de Risque

L'étude souligne que l'absence de maintenance professionnelle régulière est le principal facteur de risque de perte implantaire. Parmi les autres facteurs :

- **Antécédent de parodontite** non stabilisée
- **Tabagisme** actif
- **Diabète** mal contrôlé
- **Hygiène bucco-dentaire** insuffisante

### Prévention Essentielle

C'est pourquoi le Dr Meriot insiste sur un **suivi régulier tous les 6 mois** pour tous les patients porteurs d'implants, incluant :

- Contrôle clinique et radiographique
- Détartrage professionnel autour des implants
- Vérification de l'hygiène et conseils personnalisés

[Consulter les chiffres clés sur la péri-implantite (Source EFP)](https://www.efp.org/publications-efp/consensus-reports/peri-implant-diseases/)

*Article rédigé par le Dr Stéphanie Meriot, chirurgien-dentiste spécialisée en implantologie.*
    `
  },
  {
    slug: "greffe-osseuse-dentaire-implant",
    title: "Greffe Osseuse Dentaire : Quand et Pourquoi ?",
    excerpt: "La greffe osseuse permet de poser un implant même en cas de perte osseuse. Découvrez les différentes techniques, la procédure et les résultats attendus.",
    category: "Implantologie",
    date: "2024-11-10",
    keywords: "greffe osseuse dentaire, augmentation osseuse, sinus lift, implant dentaire, manque os",
    content: `
# Greffe Osseuse Dentaire : Quand et Pourquoi ?

La greffe osseuse dentaire (ou augmentation osseuse) est une procédure chirurgicale qui permet de reconstruire l'os de la mâchoire avant ou pendant la pose d'un implant dentaire.

## Pourquoi Manque-t-on d'Os ?

La **perte osseuse** peut avoir plusieurs causes :

### Perte de Dents
Quand une dent est perdue, l'os qui la soutenait n'est plus stimulé et se résorbe progressivement. On peut perdre **jusqu'à 40% de volume osseux** dans l'année suivant l'extraction.

### Maladie Parodontale
La parodontite détruit l'os qui entoure les dents.

### Port Prolongé de Prothèse Amovible
La pression de la prothèse accélère la résorption osseuse.

### Traumatisme ou Infection
Une fracture ou un kyste peuvent endommager l'os.

### Anatomie Naturelle
Certaines personnes ont naturellement un os plus fin, notamment au niveau des sinus (mâchoire supérieure).

## Quand Est-ce Nécessaire ?

Une greffe osseuse est nécessaire quand :

- **L'os est trop fin** pour accueillir un implant de manière stable
- **L'os est trop court** (notamment près des sinus)
- **L'os est de mauvaise qualité** (trop mou)
- On souhaite **optimiser l'esthétique** (profil de gencive naturel)

### Diagnostic

Lors de la consultation, le Dr Meriot réalise un **scanner 3D (Cone Beam)** qui permet de mesurer précisément :
- La hauteur d'os disponible
- L'épaisseur d'os
- La qualité osseuse
- La proximité des structures anatomiques (nerfs, sinus)

## Les Différents Types de Greffes

### 1. Greffe en Bloc (Onlay)

**Indication** : perte osseuse importante en hauteur ou largeur

**Matériau** : os prélevé sur le patient (menton, angle de la mâchoire) ou os synthétique

**Procédure** :
- Prélèvement d'un bloc osseux (si autogreffe)
- Fixation par vis sur la zone à reconstruire
- Couverture par une membrane
- Attente de 4-6 mois avant pose de l'implant

### 2. Greffe Sinusale (Sinus Lift)

**Indication** : manque de hauteur d'os au niveau des molaires supérieures

**Technique** :
- Ouverture d'une fenêtre dans le sinus maxillaire
- Soulèvement de la membrane sinusienne
- Comblement avec matériau osseux
- Attente de 4-6 mois avant implant (ou pose simultanée si l'os résiduel est suffisant)

**Deux approches** :
- **Sinus lift externe** : pour perte osseuse importante (< 4 mm d'os)
- **Sinus lift interne** : approche mini-invasive pour perte modérée (> 4 mm d'os)

### 3. Comblement Alvéolaire (Socket Preservation)

**Indication** : prévention de la perte osseuse juste après une extraction

**Procédure** :
- Comblement de l'alvéole (trou laissé par la dent) avec matériau osseux immédiatement après extraction
- Préserve le volume osseux pour un futur implant
- Simplifie et améliore le résultat final

### 4. Régénération Osseuse Guidée (ROG)

**Indication** : défauts osseux localisés

**Technique** :
- Placement de matériau osseux autour de l'implant
- Protection par une membrane résorbable ou non-résorbable
- Stimule la formation de nouvel os

## Matériaux Utilisés

### Os Autogène (du Patient)
**Avantages** : taux de réussite maximal, biocompatibilité parfaite  
**Inconvénients** : nécessite un prélèvement (site donneur)

### Os Allogène (donneur humain)
**Avantages** : pas de prélèvement nécessaire  
**Inconvénients** : légèrement moins efficace

### Os Xénogène (origine animale - bovin)
**Avantages** : disponible en grande quantité, coût modéré  
**Inconvénients** : intégration plus lente

### Substituts Synthétiques (hydroxyapatite, phosphate tricalcique)
**Avantages** : aucun risque biologique, disponibilité illimitée  
**Inconvénients** : résultats variables selon les cas

**Le Dr Meriot choisit le matériau le plus adapté** à votre cas spécifique.

## La Procédure

### Avant l'Intervention

- Consultation et examen radiologique 3D
- Bilan de santé général
- Arrêt du tabac recommandé
- Bain de bouche antiseptique les jours précédents

### Pendant l'Intervention

**Anesthésie** : locale (vous ne sentez rien)  
**Durée** : 1 à 2 heures selon la complexité

1. Incision et décollement de la gencive
2. Préparation du site receveur
3. Mise en place du matériau osseux
4. Couverture par membrane si nécessaire
5. Sutures

### Après l'Intervention

**Immédiat** :
- Gonflement et légère douleur (normale)
- Antalgiques et anti-inflammatoires prescrits
- Glace sur la joue
- Alimentation molle

**Première semaine** :
- Hygiène douce (bain de bouche, pas de brossage sur la zone)
- Repos relatif
- Éviter efforts physiques intenses

**Suivi** :
- Contrôle à 7-10 jours (retrait des fils si non résorbables)
- Radiographie de contrôle à 3-4 mois
- Pose de l'implant après cicatrisation complète (4-6 mois)

## Taux de Réussite

Les greffes osseuses ont un **taux de succès de 90-95%** avec une technique appropriée et un respect des protocoles.

### Facteurs de Succès

✅ Technique chirurgicale rigoureuse  
✅ Choix du bon matériau  
✅ Absence de tabac  
✅ Bonne hygiène bucco-dentaire  
✅ Suivi des consignes post-opératoires

### Complications Possibles (Rares)

- Infection
- Échec de la greffe (non-intégration)
- Perforation de la membrane sinusienne (sinus lift)
- Saignement
- Douleur persistante

**Le Dr Meriot prend toutes les précautions** pour minimiser ces risques.

## Prix d'une Greffe Osseuse

Le coût varie selon :
- Le type de greffe
- La quantité de matériau nécessaire
- La complexité

**Fourchette indicative** :
- Comblement simple : 300-600 €
- Greffe en bloc : 800-1 500 €
- Sinus lift : 1 000-2 000 €

**Prise en charge** : généralement peu ou pas remboursée par la Sécurité Sociale, mais certaines mutuelles participent.

Un **devis détaillé** vous sera remis lors de la consultation.

## Greffe et Implant : Simultanés ou en Deux Temps ?

### Pose Simultanée

**Possible si** :
- La greffe est mineure (ROG)
- L'os résiduel permet une stabilité primaire de l'implant
- Sinus lift avec > 4-5 mm d'os résiduel

**Avantage** : une seule intervention, gain de temps

### Pose en Deux Temps

**Nécessaire si** :
- Greffe importante
- Os résiduel insuffisant pour stabiliser l'implant
- Besoin d'une intégration optimale de la greffe

**Avantage** : taux de réussite maximal

## Alternatives à la Greffe

Dans certains cas, il existe des alternatives :

- **Implants courts ou étroits** (si l'os le permet)
- **Implants zygomatiques** (ancrés dans la pommette)
- **All-on-4/All-on-6** (prothèse sur 4 ou 6 implants angulés)

Le Dr Meriot évalue la meilleure option lors de la consultation.

## Expertise du Dr Meriot

Le Dr Stéphanie Meriot, formée en **implantologie avancée**, réalise régulièrement des greffes osseuses avec :

- **Techniques minimalement invasives**
- **Matériaux de haute qualité**
- **Protocoles éprouvés**
- **Suivi personnalisé**

Son approche **douce et rassurante** met les patients en confiance, même pour les interventions plus complexes.

## Prendre Rendez-vous

**Cabinet dentaire Dr Stéphanie Meriot**  
📍 23 Boulevard de la Fédération, 13004 Marseille  
📞 [09 83 43 96 21](tel:0983439621)  
🌐 [Prendre RDV sur Doctolib](https://www.doctolib.fr/dentiste/marseille/stephanie-meriot)

**Consultation spécialisée** : évaluation de votre cas, plan de traitement, devis personnalisé.

*Article rédigé par le Dr Stéphanie Meriot, chirurgien-dentiste spécialisée en implantologie et greffes osseuses.*
    `
  },
  {
    slug: "saignement-gencives-gingivite-marseille",
    title: "Gencives qui saignent à Marseille : Simple inflammation ou début de parodontite ?",
    excerpt: "Le saignement des gencives est le premier signe d'alerte d'une maladie parodontale. Découvrez pourquoi une gencive saine ne saigne jamais et quand consulter un spécialiste à Marseille.",
    category: "Parodontie",
    date: "2025-01-10",
    keywords: "saignement gencives marseille, gingivite, gingivorrhée, parodontite précoce, EFP recommandations, gencives qui saignent aix-en-provence, aubagne, la ciotat, PACA",
    content: `
# Gencives qui saignent à Marseille : Simple inflammation ou début de parodontite ?

Le saignement des gencives, appelé **gingivorrhée** en termes médicaux, est le signe clinique d'une rupture de l'homéostasie buccale. Contrairement aux idées reçues, **une gencive saine ne saigne pas**, même lors d'un brossage rigoureux ou du passage de brossettes interdentaires.

## Un symptôme à ne jamais ignorer

Si vos gencives saignent, c'est que le tissu gingival est inflammatoire. Cette inflammation est généralement causée par l'accumulation de **biofilm bactérien** (plaque dentaire) au niveau du sulcus gingival.

### Les différents types de saignement

- **Saignement au brossage** : le plus fréquent, signe précoce de gingivite
- **Saignement spontané** : indique une inflammation plus avancée
- **Saignement au sondage** : détectable uniquement par le praticien lors de l'examen

## L'enjeu clinique : agir avant l'irréversible

Une inflammation persistante est **la porte d'entrée vers la parodontite**, une pathologie irréversible entraînant la lyse osseuse (destruction de l'os alvéolaire). 

Selon la **Fédération Européenne de Parodontologie (EFP)**, le diagnostic précoce est le seul moyen d'éviter des soins complexes et coûteux.

### Évolution typique sans traitement

1. **Gingivite** → inflammation superficielle, réversible
2. **Parodontite initiale** → début de perte osseuse
3. **Parodontite modérée** → poches parodontales de 4-5mm
4. **Parodontite sévère** → mobilité dentaire, risque de perte

## Recommandations scientifiques

Les recommandations S3 de l'EFP constituent le guide de pratique clinique de référence pour le traitement des parodontites. Ce protocole, validé par les instances européennes, établit une approche étape par étape du diagnostic à la maintenance.

[Consulter les recommandations officielles de l'EFP](https://www.efp.org/education-cpg/cpg/) *(lien externe)*

## Notre expertise à Marseille

Notre cabinet propose des **bilans parodontaux complets** incluant :

- Examen clinique détaillé
- **Sondage parodontal numérique** avec cartographie des poches
- Radiographies panoramique et rétro-alvéolaires
- Analyse des facteurs de risque
- Plan de traitement personnalisé

### Zone d'intervention

Nous accueillons les patients de tout le département des **Bouches-du-Rhône** :
- Marseille et ses arrondissements
- Aix-en-Provence et le Pays d'Aix
- Aubagne, La Ciotat, Cassis
- Martigues, Istres, Étang de Berre
- Salon-de-Provence et environs

## Quand consulter ?

**Consultez rapidement si vous observez :**
- Des saignements réguliers au brossage
- Des gencives rouges ou gonflées
- Une mauvaise haleine persistante
- Des espaces entre les dents qui s'élargissent

## Prendre rendez-vous

**Cabinet dentaire Dr Stéphanie Meriot**  
📍 23 Boulevard de la Fédération, 13004 Marseille  
📞 [09 83 43 96 21](tel:0983439621)  
🌐 [Prendre RDV sur Doctolib](https://www.doctolib.fr/dentiste/marseille/stephanie-meriot)

*Article rédigé par le Dr Stéphanie Meriot, parodontologue à Marseille, formée à l'Académie de Paro d'Aix-en-Provence.*
    `
  },
  {
    slug: "laser-eryag-traitement-gencives-marseille",
    title: "Pourquoi le Laser Er:YAG révolutionne le traitement des gencives dans notre cabinet marseillais",
    excerpt: "Le laser Er:YAG offre une décontamination précise des poches parodontales avec moins de douleur et une cicatrisation accélérée. Découvrez cette technologie de pointe à Marseille.",
    category: "Parodontie",
    date: "2025-01-08",
    keywords: "laser dentaire marseille, laser Er:YAG, laser erbium parodontie, décontamination parodontale, traitement gencives laser, parodontologue aix-en-provence, aubagne, PACA",
    content: `
# Pourquoi le Laser Er:YAG révolutionne le traitement des gencives dans notre cabinet marseillais

L'utilisation du **laser en parodontologie** représente un véritable changement de paradigme dans la prise en charge des maladies des gencives. Le laser Er:YAG (Erbium:YAG) permet une **décontamination des poches parodontales** là où les instruments mécaniques traditionnels atteignent leurs limites anatomiques.

## Comment fonctionne le laser Er:YAG ?

Le laser Erbium émet une longueur d'onde de 2940 nm, parfaitement absorbée par l'eau et l'hydroxyapatite. Cette caractéristique lui confère des propriétés uniques :

### Action bactéricide sélective

Le laser cible spécifiquement les **bactéries pathogènes anaérobies** responsables de la parodontite, notamment :
- *Porphyromonas gingivalis*
- *Tannerella forsythia*
- *Treponema denticola*

### Biostimulation tissulaire

Au-delà de son action antimicrobienne, le laser favorise la **biostimulation des tissus**, accélérant significativement la cicatrisation gingivale.

## Les avantages cliniques du laser

### Pour le patient

- **Moins de douleur** : intervention plus douce qu'avec les instruments mécaniques
- **Moins de saignement** : effet hémostatique du laser
- **Cicatrisation accélérée** : biostimulation cellulaire
- **Moins de sensibilité post-opératoire**
- **Récupération plus rapide**

### Pour le praticien

- Accès aux zones difficiles (furcations, poches profondes)
- Décontamination optimale des surfaces radiculaires
- Complément idéal au surfaçage mécanique

## Validation scientifique

De nombreuses études publiées sur PubMed confirment l'efficacité du laser Erbium dans le traitement parodontal, notamment pour :

- La réduction de la profondeur des poches
- L'amélioration du gain d'attache clinique
- La diminution de l'inflammation

[Études sur l'efficacité du laser Erbium en parodontie (PubMed)](https://pubmed.ncbi.nlm.nih.gov/?term=erbium+laser+periodontitis) *(lien externe)*

## Notre protocole laser à Marseille

Dans notre cabinet, le laser Er:YAG s'intègre dans un **protocole thérapeutique complet** :

1. **Diagnostic précis** avec sondage et radiographies
2. **Phase initiale** : détartrage et surfaçage radiculaire
3. **Laser Er:YAG** : décontamination complémentaire des poches résiduelles
4. **Maintenance** : suivi régulier et contrôle

## Zone de patientèle

Nous accueillons les patients de toute la région **PACA** pour des soins laser moins invasifs et plus confortables :

- Marseille (tous arrondissements)
- Aix-en-Provence, Gardanne, Bouc-Bel-Air
- Aubagne, Gémenos, La Ciotat
- Marignane, Vitrolles, Istres
- Et tout le département des Bouches-du-Rhône

## Le laser est-il adapté à mon cas ?

Le traitement laser est particulièrement indiqué pour :

- Les parodontites modérées à sévères
- Les poches parodontales profondes (> 5mm)
- Les patients à risque hémorragique
- Les cas de péri-implantite

Une consultation préalable permet de déterminer si le laser est adapté à votre situation.

## Prendre rendez-vous

**Cabinet dentaire Dr Stéphanie Meriot**  
📍 23 Boulevard de la Fédération, 13004 Marseille  
📞 [09 83 43 96 21](tel:0983439621)  
🌐 [Prendre RDV sur Doctolib](https://www.doctolib.fr/dentiste/marseille/stephanie-meriot)

*Article rédigé par le Dr Stéphanie Meriot, chirurgien-dentiste spécialisée en parodontologie à Marseille.*
    `
  },
  {
    slug: "peri-implantite-prevention-marseille",
    title: "Péri-implantite à Marseille : Comment éviter de perdre vos implants dentaires",
    excerpt: "La péri-implantite touche 20% des patients implantés à 10 ans. Découvrez les signes d'alerte, la prévention et les traitements disponibles dans notre cabinet marseillais.",
    category: "Implantologie",
    date: "2025-01-05",
    keywords: "péri-implantite marseille, infection implant dentaire, perte implant, maintenance implants, parodontite implant, implantologue aix-en-provence, aubagne, PACA",
    content: `
# Péri-implantite à Marseille : Comment éviter de perdre vos implants dentaires

La **péri-implantite** est l'équivalent de la parodontite, mais autour d'un implant dentaire. Cette pathologie inflammatoire touche environ **20% des patients porteurs d'implants après 10 ans**. Sans traitement, l'os péri-implantaire se résorbe et l'implant peut devenir mobile, nécessitant parfois sa dépose.

## Qu'est-ce que la péri-implantite ?

La péri-implantite est une infection bactérienne qui affecte les tissus autour de l'implant :

### Stade 1 : Mucosite péri-implantaire
- Inflammation limitée à la gencive
- **Réversible** avec un traitement adapté
- Équivalent de la gingivite

### Stade 2 : Péri-implantite
- Extension de l'inflammation à l'os
- **Perte osseuse** progressive
- Risque de perte de l'implant

## Les signes d'alerte à surveiller

**Consultez immédiatement si vous observez :**

- **Saignement au brossage** autour de l'implant
- **Gencive rouge ou gonflée** au niveau du col implantaire
- **Suppuration** (pus) autour de l'implant
- **Mauvaise haleine** localisée
- **Douleur** ou sensibilité à la pression
- **Mobilité** de la couronne sur implant

## Comment prévenir la péri-implantite ?

### 1. Hygiène irréprochable

- Brossage 2 fois/jour avec une brosse adaptée
- **Brossettes interdentaires** autour des implants
- Jet dentaire si recommandé
- Bain de bouche selon prescription

### 2. Maintenance professionnelle régulière

C'est le **facteur clé de la survie implantaire**. Le consensus de l'EFP recommande :

- Contrôles tous les **3 à 6 mois**
- Détartrage spécifique (instruments non rayants)
- Radiographies de contrôle annuelles
- Sondage péri-implantaire

### 3. Contrôle des facteurs de risque

- **Arrêt du tabac** (facteur n°1)
- Contrôle du diabète
- Traitement d'une parodontite préexistante

## Validation scientifique

Le **Consensus de l'EFP sur les maladies péri-implantaires** (2018) établit les recommandations de diagnostic et de traitement basées sur les preuves scientifiques les plus récentes.

[Consensus EFP sur les maladies péri-implantaires](https://www.efp.org/publications-efp/consensus-reports/) *(lien externe)*

## Nos solutions de traitement à Marseille

En cas de péri-implantite diagnostiquée, nous proposons des **protocoles de décontamination de surface** incluant :

### Traitement non chirurgical

- **Aéropolissage** : projection de poudre d'érythritol ou glycine
- **Décontamination laser** Er:YAG
- Irrigation antiseptique (chlorhexidine)
- Antibiothérapie ciblée si nécessaire

### Traitement chirurgical (cas avancés)

- Lambeau d'accès pour décontamination
- Régénération osseuse guidée
- Greffe osseuse si indiquée

## Zone d'intervention

Nous accueillons les patients porteurs d'implants de tout le département :

- Marseille et périphérie
- Aix-en-Provence, Gardanne
- Aubagne, La Ciotat, Cassis
- Martigues, Istres, Vitrolles
- Salon-de-Provence et environs

## Prendre rendez-vous

**Cabinet dentaire Dr Stéphanie Meriot**  
📍 23 Boulevard de la Fédération, 13004 Marseille  
📞 [09 83 43 96 21](tel:0983439621)  
🌐 [Prendre RDV sur Doctolib](https://www.doctolib.fr/dentiste/marseille/stephanie-meriot)

*Article rédigé par le Dr Stéphanie Meriot, spécialiste en parodontologie et implantologie à Marseille.*
    `
  },
  {
    slug: "sportifs-sante-parodontale-marseille",
    title: "Sportifs Marseillais : Pourquoi votre santé parodontale conditionne vos performances cardiaques",
    excerpt: "Il existe un lien direct entre santé des gencives et performances athlétiques. Découvrez pourquoi les sportifs doivent particulièrement surveiller leur parodonte.",
    category: "Parodontie",
    date: "2025-01-03",
    keywords: "sportif santé dentaire marseille, parodontite performance sportive, inflammation systémique, santé cardio-vasculaire, gencives sport, athlète marseille, aubagne, PACA",
    content: `
# Sportifs Marseillais : Pourquoi votre santé parodontale conditionne vos performances cardiaques

Il existe une **corrélation directe** entre l'état des gencives et les performances athlétiques. La parodontite est une source d'**inflammation systémique chronique** qui peut affecter la récupération musculaire et la santé cardio-vasculaire.

## Le lien gencives-performance : que dit la science ?

### Inflammation chronique et récupération

La parodontite génère une **inflammation de bas grade** permanente. Cette inflammation systémique :

- **Ralentit la récupération musculaire** après l'effort
- Augmente le **stress oxydatif** cellulaire
- Affecte la **synthèse protéique** musculaire
- Diminue les **capacités d'adaptation** à l'entraînement

### Bactériémie et risque cardiaque

Lors d'un effort intense, les bactéries présentes dans les poches parodontales peuvent passer dans le sang (**bactériémie**). Ce phénomène :

- Augmente les risques d'**inflammation des parois artérielles**
- Favorise la formation de **plaques d'athérome**
- Peut aggraver les **troubles du rythme cardiaque**

## Les études scientifiques

Le rapport de l'EFP sur le lien entre **parodontite et maladies cardiovasculaires** démontre que les patients atteints de parodontite sévère ont un risque accru d'événements cardiovasculaires.

[Rapport EFP : Parodontite et Maladies Cardio-vasculaires](https://www.efp.org/publications-efp/consensus-reports/) *(lien externe)*

### Études chez les sportifs

Plusieurs études ont montré que :

- **30% des sportifs professionnels** présentent des signes de gingivite
- Les athlètes avec parodontite ont des **marqueurs inflammatoires** plus élevés
- Le traitement parodontal améliore les **paramètres de récupération**

## Les facteurs de risque chez le sportif

### Spécifiques au sport

- **Respiration buccale** à l'effort (assèchement, moins de protection salivaire)
- **Consommation de boissons énergétiques** acides et sucrées
- **Stress de compétition** (impact sur le système immunitaire)
- **Traumatismes dentaires** répétés (sports de contact)

### Généraux

- Hygiène bucco-dentaire insuffisante
- Manque de suivi dentaire régulier
- Alimentation riche en glucides

## Notre accompagnement pour les sportifs

Nous proposons un **protocole de santé globale** adapté aux athlètes :

### Bilan parodontal complet

- Examen clinique et sondage
- Évaluation des marqueurs inflammatoires
- Analyse des facteurs de risque spécifiques

### Traitement personnalisé

- Détartrage et surfaçage si nécessaire
- Protocole d'hygiène adapté à l'activité sportive
- Conseils nutritionnels bucco-dentaires

### Suivi régulier

- Maintenance tous les 3-4 mois
- Coordination avec les équipes médicales sportives
- Adaptation selon la saison compétitive

## Zone d'intervention

Nous accompagnons les sportifs de toute la région PACA :

- Marseille et métropole
- Aix-en-Provence et Pays d'Aix
- Aubagne, La Ciotat
- Martigues, Istres
- Salon-de-Provence

## Prendre rendez-vous

**Cabinet dentaire Dr Stéphanie Meriot**  
📍 23 Boulevard de la Fédération, 13004 Marseille  
📞 [09 83 43 96 21](tel:0983439621)  
🌐 [Prendre RDV sur Doctolib](https://www.doctolib.fr/dentiste/marseille/stephanie-meriot)

*Article rédigé par le Dr Stéphanie Meriot, chirurgien-dentiste spécialisée en parodontologie à Marseille.*
    `
  },
  {
    slug: "parodontiste-expert-bouches-du-rhone",
    title: "Trouver un parodontiste expert dans les Bouches-du-Rhône : Le plateau technique marseillais",
    excerpt: "Pour une pathologie complexe comme la parodontite, l'expertise et l'équipement du praticien sont déterminants. Découvrez notre plateau technique de pointe à Marseille.",
    category: "Parodontie",
    date: "2025-01-01",
    keywords: "parodontiste bouches-du-rhone, scanner 3D marseille, laser dentaire, expertise parodontie, chirurgie piézoélectrique, parodontologue aix-en-provence, aubagne, la ciotat, PACA",
    content: `
# Trouver un parodontiste expert dans les Bouches-du-Rhône : Le plateau technique marseillais

Pour une pathologie complexe comme la **parodontite**, l'expertise du praticien et la qualité de l'équipement sont les **critères de choix n°1**. Les patients n'hésitent plus à parcourir 50 km pour accéder à des technologies de pointe garantissant des soins optimaux.

## Notre plateau technique de pointe

### Scanner 3D (Cone Beam)

L'imagerie tridimensionnelle révolutionne le diagnostic parodontal :

- **Visualisation précise** de la perte osseuse
- **Analyse des défauts** intra-osseux
- **Planification chirurgicale** optimisée
- **Suivi radiologique** de la régénération

### Chirurgie piézo-électrique

La technologie piézoélectrique permet des interventions osseuses :

- **Ultra-précises** : découpe micrométrique
- **Respectueuses** des tissus mous
- **Moins traumatisantes** : récupération accélérée
- **Plus sûres** : protection des nerfs et vaisseaux

### Laser Er:YAG

Le laser Erbium complète notre arsenal thérapeutique :

- **Décontamination bactérienne** des poches parodontales
- **Action biostimulante** sur la cicatrisation
- **Confort patient** amélioré
- **Accès aux zones difficiles** (furcations)

## Notre expertise clinique

### Formation spécialisée

Le Dr Stéphanie Meriot a suivi des formations approfondies :

- **IFPIO Marseille** : Implantologie et Parodontologie
- **Académie de Paro d'Aix-en-Provence** : Parodontologie avancée
- **Formation continue** : Laser, régénération tissulaire

### Approche thérapeutique

Notre philosophie de soin repose sur :

- **Diagnostic précis** : bilan parodontal complet
- **Traitement conservateur** : préserver au maximum
- **Techniques mini-invasives** : moins de douleur, cicatrisation rapide
- **Suivi rigoureux** : maintenance à long terme

## Normes d'hygiène et d'asepsie

Conformément aux recommandations de la **Haute Autorité de Santé (HAS)**, notre cabinet respecte les protocoles stricts :

- Stérilisation de tout l'instrumentation
- Traitement de l'eau des units dentaires
- Désinfection des surfaces entre chaque patient
- Équipements de protection individuels

[Guide HAS sur l'hygiène et l'asepsie en cabinet dentaire](https://www.has-sante.fr/) *(lien externe)*

## Zone d'accès et accessibilité

Notre cabinet situé au cœur de Marseille est facilement accessible depuis toute la région PACA :

### Depuis Aix-en-Provence
- **30 minutes** via A7 puis A50
- Sortie Marseille Centre

### Depuis Aubagne / La Ciotat
- **25-35 minutes** via A50
- Direction Centre-ville

### Depuis Martigues / Istres
- **40-45 minutes** via A55
- Direction Centre-ville

### Depuis Salon-de-Provence
- **45 minutes** via A7 puis A50
- Sortie Marseille Centre

### Stationnement
- Parking public à proximité
- Transports en commun : Métro Chartreux (ligne M1)

## Les villes de notre patientèle

Nous accueillons des patients de plus de **60 communes** des Bouches-du-Rhône :

**Marseille** • Aix-en-Provence • Aubagne • La Ciotat • Cassis • Martigues • Istres • Vitrolles • Marignane • Salon-de-Provence • Gardanne • Allauch • Plan-de-Cuques • Gémenos • Roquevaire • Auriol • Bouc-Bel-Air • Cabriès • Fuveau • Trets...

## Pourquoi choisir un spécialiste ?

La parodontite est une maladie **chronique et complexe** qui nécessite :

- Un **diagnostic précis** avec les bons outils
- Des **compétences spécifiques** en parodontologie
- Un **plateau technique adapté** aux techniques modernes
- Un **suivi régulier** sur le long terme

## Prendre rendez-vous

**Cabinet dentaire Dr Stéphanie Meriot**  
📍 23 Boulevard de la Fédération, 13004 Marseille  
📞 [09 83 43 96 21](tel:0983439621)  
🌐 [Prendre RDV sur Doctolib](https://www.doctolib.fr/dentiste/marseille/stephanie-meriot)

**Première consultation** : bilan complet, plan de traitement personnalisé, devis détaillé.

*Article rédigé par le Dr Stéphanie Meriot, parodontologue à Marseille, spécialiste des maladies des gencives.*
    `
  }
];
const getBlogPostBySlug = (slug) => {
  return blogPosts.find((post) => post.slug === slug);
};
const Blog = () => {
  const { data: global } = useGlobalSettings();
  const { data: sanityPosts } = useBlogPosts();
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const posts = sanityPosts && sanityPosts.length > 0 ? sanityPosts.map((p) => {
    var _a;
    return {
      slug: typeof p.slug === "string" ? p.slug : (_a = p.slug) == null ? void 0 : _a.current,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      date: p.date
    };
  }) : blogPosts;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Blog Dentaire | Conseils Parodontie & Implantologie - Dr Meriot Marseille",
        description: "Articles et conseils d'experts sur la parodontie, l'implantologie et les soins dentaires par le Dr Stéphanie Meriot.",
        canonical: "/blog",
        keywords: "blog dentaire, conseils parodontie, implants dentaires, santé bucco-dentaire, marseille"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx(FloatingCTA, {}),
      /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 py-16 mt-20", children: [
        /* @__PURE__ */ jsxs("section", { className: "text-center mb-16 animate-fade-in", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Blog & Conseils Dentaires" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Découvrez nos articles sur la parodontie, l'implantologie et la santé bucco-dentaire." })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16", children: posts.map((post, index) => /* @__PURE__ */ jsx("article", { className: "bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in", style: { animationDelay: `${index * 100}ms` }, children: /* @__PURE__ */ jsxs("div", { className: "p-6 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-primary", children: post.category })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-card-foreground mb-3 hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Link, { to: `/blog/${post.slug}`, children: post.title }) }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4 line-clamp-3", children: post.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-4", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("time", { dateTime: post.date, children: new Date(post.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }) })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: `/blog/${post.slug}`, className: "inline-flex items-center text-primary font-medium hover:underline", children: [
            "Lire l'article ",
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ] })
        ] }) }, post.slug)) }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-6", children: "Nos spécialités" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/parodontie", className: "bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2 text-primary", children: "Parodontie" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Traitement des gencives par le Dr Meriot." })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/implantologie", className: "bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2 text-primary", children: "Implantologie" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Pose d'implants dentaires durables." })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/esthetique", className: "bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2 text-primary", children: "Esthétique dentaire" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Blanchiment, facettes et harmonisation." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "bg-primary/5 rounded-2xl p-8 md:p-12 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-foreground mb-4", children: "Une Question sur Votre Santé Dentaire ?" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-6 max-w-2xl mx-auto", children: "Le Dr Stéphanie Meriot est à votre écoute." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors", children: "Prendre RDV en Ligne" }),
            /* @__PURE__ */ jsxs("a", { href: telHref, className: "inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors", children: [
              "Appeler le ",
              tel
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const BlogPost = () => {
  var _a;
  const { slug } = useParams();
  const { data: global } = useGlobalSettings();
  const { data: sanityPost } = useBlogPost(slug ?? "");
  const tel = (global == null ? void 0 : global.phone) ?? (global == null ? void 0 : global.telephone) ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const doctolibUrl = (global == null ? void 0 : global.doctolib) ?? (global == null ? void 0 : global.doctolib_url) ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const localPost = slug ? getBlogPostBySlug(slug) : void 0;
  const post = sanityPost ? {
    slug: typeof sanityPost.slug === "string" ? sanityPost.slug : (_a = sanityPost.slug) == null ? void 0 : _a.current,
    title: sanityPost.title,
    excerpt: sanityPost.excerpt,
    content: sanityPost.content,
    category: sanityPost.category,
    date: sanityPost.date,
    keywords: sanityPost.keywords ?? ""
  } : localPost;
  if (!post) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/blog", replace: true });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: `${post.title} | Dr Stéphanie Meriot`,
        description: post.excerpt,
        canonical: `/blog/${post.slug}`,
        keywords: post.keywords,
        ogTitle: post.title,
        ogDescription: post.excerpt
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx(FloatingCTA, {}),
      /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 py-16 mt-20", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/blog", className: "inline-flex items-center text-primary hover:underline mb-8 animate-fade-in", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Retour au blog"
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxs("header", { className: "mb-12 animate-fade-in", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx(Tag, { className: "w-5 h-5 text-primary" }),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-primary", children: post.category })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-6", children: post.title }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsxs("time", { dateTime: post.date, children: [
                "Publié le ",
                new Date(post.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none animate-fade-in", style: { animationDelay: "100ms" }, children: /* @__PURE__ */ jsx(
            ReactMarkdown,
            {
              components: {
                h1: ({ node, ...props }) => /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-foreground mt-8 mb-4", ...props }),
                h2: ({ node, ...props }) => /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground mt-6 mb-3", ...props }),
                h3: ({ node, ...props }) => /* @__PURE__ */ jsx("h4", { className: "text-xl font-semibold text-foreground mt-4 mb-2", ...props }),
                p: ({ node, ...props }) => /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4 leading-relaxed", ...props }),
                ul: ({ node, ...props }) => /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6 mb-4 text-muted-foreground space-y-2", ...props }),
                ol: ({ node, ...props }) => /* @__PURE__ */ jsx("ol", { className: "list-decimal pl-6 mb-4 text-muted-foreground space-y-2", ...props }),
                li: ({ node, ...props }) => /* @__PURE__ */ jsx("li", { className: "leading-relaxed", ...props }),
                strong: ({ node, ...props }) => /* @__PURE__ */ jsx("strong", { className: "font-bold text-foreground", ...props }),
                a: ({ node, href, ...props }) => {
                  const isExternal = href == null ? void 0 : href.startsWith("http");
                  return /* @__PURE__ */ jsx("a", { className: "text-primary hover:underline font-medium", href, target: isExternal ? "_blank" : void 0, rel: isExternal ? "nofollow noopener noreferrer" : void 0, ...props });
                },
                blockquote: ({ node, ...props }) => /* @__PURE__ */ jsx("blockquote", { className: "border-l-4 border-primary pl-4 italic text-muted-foreground my-4", ...props }),
                table: ({ node, ...props }) => /* @__PURE__ */ jsx("div", { className: "overflow-x-auto my-6", children: /* @__PURE__ */ jsx("table", { className: "min-w-full border-collapse border border-border", ...props }) }),
                thead: ({ node, ...props }) => /* @__PURE__ */ jsx("thead", { className: "bg-muted", ...props }),
                th: ({ node, ...props }) => /* @__PURE__ */ jsx("th", { className: "border border-border px-4 py-2 text-left font-semibold", ...props }),
                td: ({ node, ...props }) => /* @__PURE__ */ jsx("td", { className: "border border-border px-4 py-2", ...props })
              },
              children: post.content
            }
          ) }),
          /* @__PURE__ */ jsx("footer", { className: "mt-12 pt-8 border-t border-border animate-fade-in", style: { animationDelay: "200ms" }, children: /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 rounded-xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-3", children: "À propos de l'auteur" }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mb-4", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Dr Stéphanie Meriot" }),
              " est chirurgien-dentiste spécialisée en parodontologie et implantologie à Marseille 4ème."
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/a-propos", className: "inline-flex items-center text-primary font-medium hover:underline", children: [
              "En savoir plus sur le Dr Meriot ",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("section", { className: "mt-12 bg-primary/5 rounded-2xl p-8 text-center animate-fade-in", style: { animationDelay: "300ms" }, children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-4", children: "Besoin d'un Rendez-vous ?" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "Prenez rendez-vous pour un bilan personnalisé" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
              /* @__PURE__ */ jsx("a", { href: doctolibUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors", children: "Prendre RDV en Ligne" }),
              /* @__PURE__ */ jsxs("a", { href: telHref, className: "inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors", children: [
                "Appeler le ",
                tel
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props }));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h5", { ref, className: cn("mb-1 font-medium leading-none tracking-tight", className), ...props })
);
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props })
);
AlertDescription.displayName = "AlertDescription";
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
});
const LOGIN_TIMEOUT_MS = 15e3;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loadingSeconds, setLoadingSeconds] = useState(0);
  const { signIn, user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const loadingIntervalRef = useRef(null);
  useEffect(() => {
    if (justLoggedIn) return;
    if (!authLoading && user) {
      navigate("/admin");
    }
  }, [user, authLoading, navigate, justLoggedIn]);
  useEffect(() => {
    if (isLoading) {
      setLoadingSeconds(0);
      loadingIntervalRef.current = setInterval(() => {
        setLoadingSeconds((prev) => prev + 1);
      }, 1e3);
    }
    return () => {
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
    };
  }, [isLoading]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setIsLoading(true);
    try {
      if (isSignUp) {
        const signUpPromise = supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("TIMEOUT")), LOGIN_TIMEOUT_MS);
        });
        const { error: signUpError } = await Promise.race([signUpPromise, timeoutPromise]);
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        setSuccess("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        setIsSignUp(false);
      } else {
        const signInPromise = signIn(email, password);
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("TIMEOUT")), LOGIN_TIMEOUT_MS);
        });
        const { error: signInError } = await Promise.race([signInPromise, timeoutPromise]);
        if (signInError) {
          if (signInError.message.includes("Invalid login credentials")) {
            setError("Email ou mot de passe incorrect");
          } else if (signInError.message.includes("Email not confirmed")) {
            setError("Veuillez confirmer votre email avant de vous connecter");
          } else {
            setError("Une erreur est survenue lors de la connexion");
          }
          return;
        }
      }
    } catch (err) {
      if (err.message === "TIMEOUT") {
        setError("La connexion prend trop de temps. Vérifiez votre connexion internet et réessayez.");
      } else {
        setError("Une erreur inattendue s'est produite");
      }
    } finally {
      setIsLoading(false);
      setLoadingSeconds(0);
    }
  };
  const handleResetSession = async () => {
    try {
      await supabase.auth.signOut();
      setError(null);
      setSuccess("Session réinitialisée. Vous pouvez réessayer de vous connecter.");
    } catch (err) {
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-muted/30 p-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: isSignUp ? "Créer un compte" : "Administration" }),
      /* @__PURE__ */ jsx(CardDescription, { children: isSignUp ? "Créez votre compte administrateur" : "Connectez-vous pour accéder au tableau de bord" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        error && /* @__PURE__ */ jsxs(Alert, { variant: "destructive", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx(AlertDescription, { children: error })
        ] }),
        success && /* @__PURE__ */ jsxs(Alert, { className: "border-green-500 bg-green-50 text-green-800", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-green-600" }),
          /* @__PURE__ */ jsx(AlertDescription, { children: success })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "votre@email.com",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              disabled: isLoading
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Mot de passe" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              placeholder: "••••••••",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              disabled: isLoading
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
          loadingSeconds > 3 ? `Connexion en cours (${loadingSeconds}s)...` : "Connexion..."
        ] }) : isSignUp ? "Créer le compte" : "Se connecter" }),
        isLoading && loadingSeconds > 5 && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Si cela prend trop de temps, vérifiez votre connexion ou désactivez votre bloqueur de publicités." }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            className: "w-full text-sm",
            onClick: () => {
              setIsSignUp(!isSignUp);
              setError(null);
              setSuccess(null);
            },
            disabled: isLoading,
            children: isSignUp ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? Créer un compte"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "link",
            className: "text-xs text-muted-foreground",
            onClick: handleResetSession,
            disabled: isLoading,
            children: "Problème de connexion ? Réinitialiser la session"
          }
        )
      ] })
    ] })
  ] }) });
};
const AdminLayout = ({ children, title }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };
  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/blog", icon: FileText, label: "Articles de Blog" },
    { path: "/admin/pages", icon: Settings, label: "Pages" }
  ];
  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center justify-between p-4 border-b bg-card", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setIsSidebarOpen(!isSidebarOpen),
          children: isSidebarOpen ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: "Admin CMS" }),
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: handleSignOut, children: /* @__PURE__ */ jsx(LogOut, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxs(
        "aside",
        {
          className: `
            fixed lg:static inset-y-0 left-0 z-50
            w-64 bg-card border-r transform transition-transform duration-200
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            lg:min-h-screen
          `,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6 border-b", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-foreground", children: "CMS Admin" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1 truncate", children: user == null ? void 0 : user.email })
            ] }),
            /* @__PURE__ */ jsx("nav", { className: "p-4 space-y-1", children: navItems.map((item) => /* @__PURE__ */ jsxs(
              Link,
              {
                to: item.path,
                onClick: () => setIsSidebarOpen(false),
                className: `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.path) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}
                `,
                children: [
                  /* @__PURE__ */ jsx(item.icon, { className: "h-5 w-5" }),
                  /* @__PURE__ */ jsx("span", { children: item.label })
                ]
              },
              item.path
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4 border-t", children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "ghost",
                  className: "w-full justify-start gap-3",
                  onClick: handleSignOut,
                  children: [
                    /* @__PURE__ */ jsx(LogOut, { className: "h-5 w-5" }),
                    "Déconnexion"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(Link, { to: "/", className: "block mt-2", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full justify-start gap-3", children: [
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" }),
                "Voir le site"
              ] }) })
            ] })
          ]
        }
      ),
      isSidebarOpen && /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 bg-black/50 z-40 lg:hidden",
          onClick: () => setIsSidebarOpen(false)
        }
      ),
      /* @__PURE__ */ jsx("main", { className: "flex-1 p-6 lg:p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-foreground mb-6", children: title }),
        children
      ] }) })
    ] })
  ] });
};
const Dashboard = () => {
  const { data: blogStats } = useQuery({
    queryKey: ["admin-blog-stats"],
    queryFn: async () => {
      const { data: all, error: allError } = await supabase.from("blog_posts").select("id, published", { count: "exact" });
      if (allError) throw allError;
      const total = (all == null ? void 0 : all.length) || 0;
      const published = (all == null ? void 0 : all.filter((p) => p.published).length) || 0;
      const drafts = total - published;
      return { total, published, drafts };
    }
  });
  const { data: recentPosts } = useQuery({
    queryKey: ["admin-recent-posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("id, title, slug, published, created_at, category").order("created_at", { ascending: false }).limit(5);
      if (error) throw error;
      return data;
    }
  });
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Dashboard", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Total Articles" }),
          /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: (blogStats == null ? void 0 : blogStats.total) || 0 }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Publiés" }),
          /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-green-600", children: (blogStats == null ? void 0 : blogStats.published) || 0 }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Brouillons" }),
          /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-amber-600", children: (blogStats == null ? void 0 : blogStats.drafts) || 0 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "mb-8 border-primary/20 bg-primary/5", children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "📖 Comment modifier le contenu du site ?" }) }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs("ol", { className: "space-y-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0", children: "1" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Allez dans ",
              /* @__PURE__ */ jsx("strong", { children: '"Gestion des Pages"' }),
              " dans le menu à gauche"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0", children: "2" }),
            /* @__PURE__ */ jsx("span", { children: "Cliquez sur la page que vous souhaitez modifier (ex: Page d'accueil, Parodontie...)" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0", children: "3" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Modifiez les textes dans les champs et cliquez sur ",
              /* @__PURE__ */ jsx("strong", { children: '"Enregistrer"' }),
              ". C'est tout ! ✨"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(Link, { to: "/admin/pages", children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: "Modifier le contenu du site →" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Actions rapides" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsx(Link, { to: "/admin/blog/new", children: /* @__PURE__ */ jsxs(Button, { children: [
          /* @__PURE__ */ jsx(FileText, { className: "mr-2 h-4 w-4" }),
          "Nouvel article"
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/admin/blog", children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Gérer les articles" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Articles récents" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: recentPosts && recentPosts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: recentPosts.map((post) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 rounded-lg bg-muted/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium text-foreground", children: post.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
              new Date(post.created_at).toLocaleDateString("fr-FR")
            ] }),
            /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded-full text-xs ${post.published ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`, children: post.published ? "Publié" : "Brouillon" }),
            /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary", children: post.category })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: `/admin/blog/edit/${post.id}`, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }) })
      ] }, post.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-8", children: "Aucun article pour le moment. Créez votre premier article !" }) })
    ] })
  ] });
};
const Table = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props })
);
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props })
);
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tfoot", { ref, className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props })
);
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", { ref, className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className), ...props })
);
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props })
);
TableCaption.displayName = "TableCaption";
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, { ref, className: cn("text-lg font-semibold", className), ...props }));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
const BlogList = () => {
  const queryClient2 = useQueryClient();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast$1.success("Article supprimé avec succès");
    },
    onError: () => {
      toast$1.error("Erreur lors de la suppression");
    }
  });
  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, published }) => {
      const { error } = await supabase.from("blog_posts").update({ published: !published }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast$1.success("Statut mis à jour");
    },
    onError: () => {
      toast$1.error("Erreur lors de la mise à jour");
    }
  });
  return /* @__PURE__ */ jsx(AdminLayout, { title: "Articles de Blog", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Tous les articles" }),
      /* @__PURE__ */ jsx(Link, { to: "/admin/blog/new", children: /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Nouvel article"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "Chargement..." }) : posts && posts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Titre" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Catégorie" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Statut" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: posts.map((post) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium max-w-xs truncate", children: post.title }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full text-xs bg-primary/10 text-primary", children: post.category }) }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded-full text-xs ${post.published ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`, children: post.published ? "Publié" : "Brouillon" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: new Date(post.created_at).toLocaleDateString("fr-FR") }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => togglePublishMutation.mutate({
                id: post.id,
                published: post.published ?? false
              }),
              title: post.published ? "Dépublier" : "Publier",
              children: post.published ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(Link, { to: `/admin/blog/edit/${post.id}`, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Supprimer l'article ?" }),
                /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Cette action est irréversible. L'article sera définitivement supprimé." })
              ] }),
              /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Annuler" }),
                /* @__PURE__ */ jsx(
                  AlertDialogAction,
                  {
                    onClick: () => deleteMutation.mutate(post.id),
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    children: "Supprimer"
                  }
                )
              ] })
            ] })
          ] })
        ] }) })
      ] }, post.id)) })
    ] }) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "Aucun article pour le moment" }),
      /* @__PURE__ */ jsx(Link, { to: "/admin/blog/new", children: /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Créer votre premier article"
      ] }) })
    ] }) })
  ] }) });
};
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const TipTapEditor = ({ content, onChange, placeholder }) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg"
        }
      }),
      Link$1.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline"
        }
      }),
      Placeholder.configure({
        placeholder: placeholder || "Commencez à écrire..."
      })
    ],
    content,
    onUpdate: ({ editor: editor2 }) => {
      onChange(editor2.getHTML());
    }
  });
  if (!editor) {
    return null;
  }
  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setIsLinkDialogOpen(false);
    }
  };
  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setIsImageDialogOpen(false);
    }
  };
  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title
  }) => /* @__PURE__ */ jsx(
    Button,
    {
      type: "button",
      variant: isActive ? "default" : "ghost",
      size: "sm",
      onClick,
      className: "h-8 w-8 p-0",
      title,
      children
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: "border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 p-2 border-b bg-muted/50", children: [
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleBold().run(),
          isActive: editor.isActive("bold"),
          title: "Gras",
          children: /* @__PURE__ */ jsx(Bold, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleItalic().run(),
          isActive: editor.isActive("italic"),
          title: "Italique",
          children: /* @__PURE__ */ jsx(Italic, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-border mx-1 self-center" }),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: editor.isActive("heading", { level: 1 }),
          title: "Titre 1",
          children: /* @__PURE__ */ jsx(Heading1, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: editor.isActive("heading", { level: 2 }),
          title: "Titre 2",
          children: /* @__PURE__ */ jsx(Heading2, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: editor.isActive("heading", { level: 3 }),
          title: "Titre 3",
          children: /* @__PURE__ */ jsx(Heading3, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-border mx-1 self-center" }),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          isActive: editor.isActive("bulletList"),
          title: "Liste à puces",
          children: /* @__PURE__ */ jsx(List, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: editor.isActive("orderedList"),
          title: "Liste numérotée",
          children: /* @__PURE__ */ jsx(ListOrdered, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: editor.isActive("blockquote"),
          title: "Citation",
          children: /* @__PURE__ */ jsx(Quote, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: editor.isActive("codeBlock"),
          title: "Bloc de code",
          children: /* @__PURE__ */ jsx(Code, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-border mx-1 self-center" }),
      /* @__PURE__ */ jsxs(Dialog, { open: isLinkDialogOpen, onOpenChange: setIsLinkDialogOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", title: "Ajouter un lien", children: /* @__PURE__ */ jsx(Link$2, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Ajouter un lien" }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 py-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "link-url", children: "URL du lien" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "link-url",
                  value: linkUrl,
                  onChange: (e) => setLinkUrl(e.target.value),
                  placeholder: "https://example.com"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Button, { onClick: addLink, className: "w-full", children: "Insérer le lien" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open: isImageDialogOpen, onOpenChange: setIsImageDialogOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", title: "Ajouter une image", children: /* @__PURE__ */ jsx(Image$1, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Ajouter une image" }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 py-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "image-url", children: "URL de l'image" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "image-url",
                  value: imageUrl,
                  onChange: (e) => setImageUrl(e.target.value),
                  placeholder: "https://example.com/image.jpg"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Button, { onClick: addImage, className: "w-full", children: "Insérer l'image" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1" }),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().undo().run(),
          title: "Annuler",
          children: /* @__PURE__ */ jsx(Undo, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().redo().run(),
          title: "Rétablir",
          children: /* @__PURE__ */ jsx(Redo, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      EditorContent,
      {
        editor,
        className: "prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:min-h-[280px] [&_.ProseMirror_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child]:before:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child]:before:float-left [&_.ProseMirror_p.is-editor-empty:first-child]:before:pointer-events-none"
      }
    )
  ] });
};
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "hr",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "s",
  "a",
  "img",
  "blockquote",
  "pre",
  "code",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "div",
  "span"
];
const ALLOWED_ATTR = [
  "href",
  "target",
  "rel",
  "src",
  "alt",
  "title",
  "class",
  "width",
  "height"
];
function sanitizeHtml(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false
  });
}
const blogPostSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis").max(200, "Le titre est trop long"),
  slug: z.string().trim().min(1, "Le slug est requis").max(200, "Le slug est trop long"),
  excerpt: z.string().trim().max(500, "L'extrait est trop long").optional(),
  content: z.string().min(1, "Le contenu est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  keywords: z.string().trim().max(500, "Les mots-clés sont trop longs").optional(),
  image_url: z.string().url("URL d'image invalide").optional().or(z.literal("")),
  published: z.boolean()
});
const categories = ["Parodontie", "Implantologie", "Soins Dentaires"];
const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient2 = useQueryClient();
  const { user } = useAuth();
  const isEditing = !!id;
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Parodontie",
    keywords: "",
    image_url: "",
    published: false
  });
  const [errors, setErrors] = useState({});
  const { data: existingPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["admin-blog-post", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
    enabled: isEditing
  });
  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt || "",
        content: existingPost.content,
        category: existingPost.category,
        keywords: existingPost.keywords || "",
        image_url: existingPost.image_url || "",
        published: existingPost.published ?? false
      });
    }
  }, [existingPost]);
  const generateSlug = (title) => {
    return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };
  const handleTitleChange = (title) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (isEditing) {
        const { error } = await supabase.from("blog_posts").update({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || null,
          content: data.content,
          category: data.category,
          keywords: data.keywords || null,
          image_url: data.image_url || null,
          published: data.published
        }).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || null,
          content: data.content,
          category: data.category,
          keywords: data.keywords || null,
          image_url: data.image_url || null,
          published: data.published,
          author_id: user == null ? void 0 : user.id
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast$1.success(isEditing ? "Article mis à jour" : "Article créé");
      navigate("/admin/blog");
    },
    onError: (error) => {
      toast$1.error(`Erreur: ${error.message}`);
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const validation = blogPostSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    saveMutation.mutate({
      ...formData,
      content: sanitizeHtml(formData.content)
    });
  };
  if (isEditing && isLoadingPost) {
    return /* @__PURE__ */ jsx(AdminLayout, { title: "Chargement...", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }) }) });
  }
  return /* @__PURE__ */ jsx(AdminLayout, { title: isEditing ? "Modifier l'article" : "Nouvel article", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          onClick: () => navigate("/admin/blog"),
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
            "Retour"
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex-1" }),
      formData.slug && /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/blog/${formData.slug}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-sm text-muted-foreground hover:text-foreground flex items-center gap-1",
          children: [
            /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }),
            "Prévisualiser"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: saveMutation.isPending, children: [
        saveMutation.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "mr-2 h-4 w-4" }),
        isEditing ? "Mettre à jour" : "Créer"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Contenu" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Titre *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "title",
                value: formData.title,
                onChange: (e) => handleTitleChange(e.target.value),
                placeholder: "Titre de l'article",
                className: errors.title ? "border-destructive" : ""
              }
            ),
            errors.title && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug (URL) *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "slug",
                value: formData.slug,
                onChange: (e) => setFormData((prev) => ({ ...prev, slug: e.target.value })),
                placeholder: "titre-de-larticle",
                className: errors.slug ? "border-destructive" : ""
              }
            ),
            errors.slug && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.slug }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "URL: /blog/",
              formData.slug || "slug"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "excerpt", children: "Extrait" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "excerpt",
                value: formData.excerpt,
                onChange: (e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value })),
                placeholder: "Court résumé de l'article (affiché dans les listes)",
                rows: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Contenu de l'article *" }),
            /* @__PURE__ */ jsx(
              TipTapEditor,
              {
                content: formData.content,
                onChange: (content) => setFormData((prev) => ({ ...prev, content })),
                placeholder: "Rédigez votre article ici..."
              }
            ),
            errors.content && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.content })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Publication" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "published", children: "Publier" }),
              /* @__PURE__ */ jsx(
                Switch,
                {
                  id: "published",
                  checked: formData.published,
                  onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, published: checked }))
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formData.published ? "L'article sera visible sur le site" : "L'article restera en brouillon" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Paramètres" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "category", children: "Catégorie *" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: formData.category,
                  onValueChange: (value) => setFormData((prev) => ({ ...prev, category: value })),
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: errors.category ? "border-destructive" : "", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Sélectionner..." }) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: categories.map((cat) => /* @__PURE__ */ jsx(SelectItem, { value: cat, children: cat }, cat)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "keywords", children: "Mots-clés SEO" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "keywords",
                  value: formData.keywords,
                  onChange: (e) => setFormData((prev) => ({ ...prev, keywords: e.target.value })),
                  placeholder: "mot-clé1, mot-clé2, ..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "image_url", children: "Image de couverture (URL)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "image_url",
                  value: formData.image_url,
                  onChange: (e) => setFormData((prev) => ({ ...prev, image_url: e.target.value })),
                  placeholder: "https://...",
                  className: errors.image_url ? "border-destructive" : ""
                }
              ),
              errors.image_url && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.image_url }),
              formData.image_url && /* @__PURE__ */ jsx(
                "img",
                {
                  src: formData.image_url,
                  alt: "Preview",
                  className: "w-full h-32 object-cover rounded-lg mt-2",
                  onError: (e) => {
                    e.target.style.display = "none";
                  }
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
const ImageUpload = ({ label, help, value, onChange, folder = "general" }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const handleUpload = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast$1.error("Veuillez sélectionner une image (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast$1.error("L'image ne doit pas dépasser 5 Mo");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("site-images").upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(fileName);
      onChange(publicUrl);
      toast$1.success("✅ Image téléchargée avec succès !");
    } catch (err) {
      console.error(err);
      toast$1.error("Erreur lors de l'envoi de l'image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const handleRemove = () => {
    onChange("");
    toast$1.success("Image supprimée");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(Label, { className: "text-sm font-semibold", children: label }),
    help && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: help }),
    value && /* @__PURE__ */ jsxs("div", { className: "relative w-40 h-40 rounded-lg overflow-hidden border bg-muted/30", children: [
      /* @__PURE__ */ jsx("img", { src: value, alt: "Aperçu", className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          size: "icon",
          variant: "destructive",
          className: "absolute top-1 right-1 h-7 w-7",
          onClick: handleRemove,
          children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "image/*",
          className: "hidden",
          onChange: handleUpload
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          disabled: uploading,
          onClick: () => {
            var _a;
            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          children: [
            uploading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4 mr-2" }),
            uploading ? "Envoi en cours…" : value ? "Changer l'image" : "Choisir une image"
          ]
        }
      )
    ] })
  ] });
};
const fieldLabels = {
  hero: {
    titre: { label: "Titre principal", help: "Le grand titre affiché en haut de la page d'accueil" },
    sous_titre: { label: "Sous-titre", help: "Le texte juste en dessous du titre principal" },
    description: { label: "Description", help: "Le paragraphe de présentation sous le sous-titre" },
    photo_url: { label: "📷 Photo du héro", help: "La grande photo affichée à droite sur la page d'accueil (format portrait recommandé)" }
  },
  praticien: {
    nom: { label: "Nom du praticien", help: "Le nom affiché dans la section praticien" },
    photo_url: { label: "📷 Photo du praticien", help: "La photo affichée dans la section praticien sur la page d'accueil" },
    description: { label: "Présentation", help: "Le premier paragraphe de présentation" },
    parcours: { label: "Parcours", help: "Le deuxième paragraphe sur la formation et la philosophie" },
    citation: { label: "Citation", help: "La phrase en italique dans l'encadré" }
  },
  philosophie: {
    titre: { label: "Titre de la section", help: "Le titre de la section philosophie" },
    description: { label: "Description", help: "Le texte d'introduction sous le titre" },
    citation: { label: "Citation", help: "La grande citation en bas de la section" }
  },
  horaires: {
    lundi: { label: "Lundi", help: "Horaires du lundi (ex: 09h-12h, 14h-17h)" },
    mardi: { label: "Mardi", help: "Horaires du mardi" },
    mercredi: { label: "Mercredi", help: "Écrire 'Fermé' si le cabinet est fermé" },
    jeudi: { label: "Jeudi", help: "Horaires du jeudi" },
    vendredi: { label: "Vendredi", help: "Horaires du vendredi" },
    samedi_dimanche: { label: "Samedi-Dimanche", help: "Écrire 'Fermé' si le cabinet est fermé" },
    telephone: { label: "Téléphone", help: "Le numéro de téléphone du cabinet" },
    adresse: { label: "Adresse", help: "L'adresse complète du cabinet" }
  },
  intro: {
    titre: { label: "Titre de la page", help: "Le grand titre en haut de la page" },
    description: { label: "Description d'introduction", help: "Le paragraphe d'introduction sous le titre" }
  }
};
const pageNames = {
  accueil: { label: "🏠 Page d'accueil", icon: Home, url: "/" },
  parodontie: { label: "🦷 Parodontie", icon: Stethoscope, url: "/parodontie" },
  implantologie: { label: "🔩 Implantologie", icon: Stethoscope, url: "/implantologie" },
  esthetique: { label: "✨ Esthétique", icon: Sparkles, url: "/esthetique" },
  tarifs: { label: "💰 Tarifs", icon: CreditCard, url: "/tarifs" }
};
const sectionNames = {
  hero: "🎯 Bannière principale",
  praticien: "👩‍⚕️ Présentation du praticien",
  philosophie: "💡 Philosophie",
  horaires: "🕐 Horaires et contact",
  intro: "📝 Introduction de la page"
};
const PageManager = () => {
  const queryClient2 = useQueryClient();
  const [editedSections, setEditedSections] = useState({});
  const { data: sections, isLoading } = useQuery({
    queryKey: ["admin-page-sections"],
    queryFn: async () => {
      const { data, error } = await supabase.from("page_sections").select("*").order("page_name", { ascending: true });
      if (error) throw error;
      return data;
    }
  });
  useEffect(() => {
    if (sections) {
      const initial = {};
      sections.forEach((section) => {
        initial[section.id] = section.content;
      });
      setEditedSections(initial);
    }
  }, [sections]);
  const saveMutation = useMutation({
    mutationFn: async ({ id, content }) => {
      const { error } = await supabase.from("page_sections").update({ content }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin-page-sections"] });
      toast$1.success("✅ Modifications enregistrées ! Les changements sont visibles sur le site.");
    },
    onError: () => {
      toast$1.error("❌ Erreur lors de la sauvegarde. Réessayez.");
    }
  });
  const handleFieldChange = (sectionId, field, value) => {
    setEditedSections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value
      }
    }));
  };
  const handleSave = (sectionId) => {
    const content = editedSections[sectionId];
    if (content) {
      saveMutation.mutate({ id: sectionId, content });
    }
  };
  const groupedSections = sections == null ? void 0 : sections.reduce((acc, section) => {
    if (!acc[section.page_name]) {
      acc[section.page_name] = [];
    }
    acc[section.page_name].push(section);
    return acc;
  }, {});
  const getFieldMeta = (sectionKey, fieldKey) => {
    var _a;
    return ((_a = fieldLabels[sectionKey]) == null ? void 0 : _a[fieldKey]) ?? {
      label: fieldKey.replace(/_/g, " "),
      help: ""
    };
  };
  const imageFields = /* @__PURE__ */ new Set(["photo_url", "image_url"]);
  const renderField = (sectionId, sectionKey, fieldKey, value) => {
    const meta = getFieldMeta(sectionKey, fieldKey);
    if (imageFields.has(fieldKey)) {
      const stringValue2 = typeof value === "string" ? value : "";
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        ImageUpload,
        {
          label: meta.label,
          help: meta.help,
          value: stringValue2,
          onChange: (url) => handleFieldChange(sectionId, fieldKey, url),
          folder: sectionKey
        }
      ) }, fieldKey);
    }
    const stringValue = typeof value === "string" ? value : JSON.stringify(value, null, 2);
    const isLongText = stringValue.length > 80 || stringValue.includes("\n");
    return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: `${sectionId}-${fieldKey}`, className: "text-sm font-semibold", children: meta.label }),
      meta.help && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: meta.help }),
      isLongText ? /* @__PURE__ */ jsx(
        Textarea,
        {
          id: `${sectionId}-${fieldKey}`,
          value: stringValue,
          onChange: (e) => handleFieldChange(sectionId, fieldKey, e.target.value),
          rows: 3,
          className: "mt-1"
        }
      ) : /* @__PURE__ */ jsx(
        Input,
        {
          id: `${sectionId}-${fieldKey}`,
          value: stringValue,
          onChange: (e) => handleFieldChange(sectionId, fieldKey, e.target.value),
          className: "mt-1"
        }
      )
    ] }, fieldKey);
  };
  const pageOrder = ["accueil", "parodontie", "implantologie", "esthetique", "tarifs"];
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Modifier le contenu du site", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "💡 ",
      /* @__PURE__ */ jsx("strong", { children: "Astuce :" }),
      ` Modifiez les textes ci-dessous puis cliquez sur "Enregistrer". Les changements apparaissent immédiatement sur le site. Si un champ est vide, le texte par défaut s'affiche.`
    ] }) }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Sections modifiables" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }) }) : groupedSections && Object.keys(groupedSections).length > 0 ? /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: pageOrder.filter((p) => groupedSections[p]).map((pageName) => {
        const pageSections = groupedSections[pageName];
        const pageMeta = pageNames[pageName] ?? { label: pageName, url: "/" };
        return /* @__PURE__ */ jsxs(AccordionItem, { value: pageName, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-lg font-semibold", children: pageMeta.label }),
          /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-6 pt-4", children: pageSections.map((section) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-5 bg-muted/30", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base", children: sectionNames[section.section_key] ?? section.section_key }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: pageMeta.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-xs text-muted-foreground hover:text-primary flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" }),
                      "Voir sur le site"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: () => handleSave(section.id),
                    disabled: saveMutation.isPending,
                    children: [
                      saveMutation.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
                      /* @__PURE__ */ jsx("span", { className: "ml-2", children: "Enregistrer" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: editedSections[section.id] && Object.entries(editedSections[section.id]).map(
              ([fieldKey, fieldValue]) => renderField(section.id, section.section_key, fieldKey, fieldValue)
            ) })
          ] }, section.id)) }) })
        ] }, pageName);
      }) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Aucune section de page configurée pour le moment." }) }) })
    ] })
  ] });
};
const queryClient = new QueryClient();
function Layout() {
  return /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsx(Toaster$1, {}),
    /* @__PURE__ */ jsx(Toaster, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] }) }) });
}
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(Layout, {}),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(Index, {}) },
      { path: "services", element: /* @__PURE__ */ jsx(Services, {}) },
      { path: "a-propos", element: /* @__PURE__ */ jsx(About, {}) },
      { path: "tarifs", element: /* @__PURE__ */ jsx(Tarifs, {}) },
      { path: "contact", element: /* @__PURE__ */ jsx(ContactPage, {}) },
      { path: "parodontie", element: /* @__PURE__ */ jsx(Parodontie, {}) },
      { path: "implantologie", element: /* @__PURE__ */ jsx(Implantologie, {}) },
      { path: "esthetique", element: /* @__PURE__ */ jsx(Esthetique, {}) },
      { path: "blog", element: /* @__PURE__ */ jsx(Blog, {}) },
      { path: "blog/:slug", element: /* @__PURE__ */ jsx(BlogPost, {}) },
      { path: "mentions-legales", element: /* @__PURE__ */ jsx(MentionsLegales, {}) },
      { path: "confidentialite", element: /* @__PURE__ */ jsx(Confidentialite, {}) },
      { path: "acces-cabinet", element: /* @__PURE__ */ jsx(ContactPage, {}) },
      { path: "admin/login", element: /* @__PURE__ */ jsx(Login, {}) },
      { path: "admin", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(Dashboard, {}) }) },
      { path: "admin/blog", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(BlogList, {}) }) },
      { path: "admin/blog/new", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(BlogEditor, {}) }) },
      { path: "admin/blog/edit/:id", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(BlogEditor, {}) }) },
      { path: "admin/pages", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(PageManager, {}) }) },
      { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) }
    ]
  }
];
const createRoot = ViteReactSSG({ routes });
export {
  createRoot
};
