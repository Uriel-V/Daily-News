"use client"

import type React from "react"
import { useState } from "react"
import { Marquee } from "@/components/Marquee"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Mail, Newspaper, Zap, Shield, Clock, Users, Sparkles} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap: { scale: 0.95 },
}

const iconFloat = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export default function BrevityLanding() {
  const [email, setEmail] = useState("")
  const [unsubscribeEmail, setUnsubscribeEmail] = useState("")
  const [adminKey, setAdminKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    const res = await fetch("https://daily-news-tfhw.onrender.com/email/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: email })
    })

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (!res.ok) {
      toast.error("Failed to subscribe", {
        description: "Please retry and enter a valid email address",
      })

      setEmail("")
      setIsLoading(false)
      return
    }

    toast.success("Successfully subscribed!", {
      description: "You'll receive your first digest tomorrow morning.",
    })

    setEmail("")
    setIsLoading(false)
  }

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!unsubscribeEmail) return

    setIsLoading(true)
    const res = await fetch("https://daily-news-tfhw.onrender.com/email/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: unsubscribeEmail })
    })

    if (!res.ok) {
      toast.error("Failed to unsubscribe", {
        description: "Your email wasn't found in our database"
      })

      setUnsubscribeEmail("")
      setIsLoading(false)
      return
    }

    toast.success("Successfully unsubscribed", {
      description: "You won't receive any more emails from us.",
    })

    setUnsubscribeEmail("")
    setIsLoading(false)
  }

  const handleSendEmails = async () => {
    if (!adminKey) {
      toast.error("Please enter the admin secret key.")
      return
    }

    setIsLoading(true)
    const res = await fetch("https://daily-news-tfhw.onrender.com/adminkey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: adminKey })
    })

    if (!res.ok) {
      toast.error("Incorrect key", {
        description: "Please enter the correct admin key",
      })

      setAdminKey("")
      setIsLoading(false)
      return
    }

    toast.success("Correct admin key!", {
      description: "Emails have been delievered.",
    })

    setAdminKey("")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 gradient-animate opacity-5" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="container mx-auto px-4 py-8 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
            <motion.div
              className="p-2 bg-primary/10 rounded-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            >
              <Newspaper className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Briefly
            </h1>
          </motion.div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <a
              href="https://github.com/Uriel-V/Daily-News"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Github
                </Badge>
              </motion.div>
            </a>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Stay Informed Without the{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Overload
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            Welcome to Briefly – your shortcut to staying informed without information overload. Each day, we gather the
            most important stories from trusted sources like The Washington Post, CNN, ABC, CNBC, and BBC News. Using
            advanced natural language processing powered by OpenAI&apos;s GPT model, we distill the headlines into clear,
            concise summaries delivered straight to your inbox. Simply enter your email to start receiving daily digests
            that keep you up to date in just minutes.
          </motion.p>

          {/* Features */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              {
                icon: Zap,
                title: "AI-Powered Summaries",
                description: "Advanced GPT technology distills complex news into clear, digestible insights",
              },
              {
                icon: Shield,
                title: "Trusted Sources",
                description: "Only the most reliable news outlets: Washington Post, CNN, ABC, CNBC, BBC",
              },
              {
                icon: Clock,
                title: "Daily Delivery",
                description: "Get your news digest every morning – stay informed in just minutes",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <motion.div
                      className="p-4 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mb-16 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative">
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Marquee speed={20} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <motion.section
        className="container mx-auto px-4 py-16 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="subscribe" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger
                value="subscribe"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Subscribe
              </TabsTrigger>
              <TabsTrigger
                value="unsubscribe"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Unsubscribe
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Admin
              </TabsTrigger>
            </TabsList>

            {/* Subscribe Tab */}
            <TabsContent value="subscribe">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-xl">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
                      <motion.div className="p-2 bg-primary/10 rounded-lg" whileHover={{ scale: 1.1, rotate: 10 }}>
                        <Mail className="h-6 w-6 text-primary" />
                      </motion.div>
                      <span>Join Our News Delivery Service</span>
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Get the most important news delivered to your inbox every morning
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full h-12 text-lg bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </motion.div>
                      <motion.div variants={scaleOnHover} whileHover="whileHover" whileTap="whileTap">
                        <Button
                          type="submit"
                          className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                          ) : null}
                          {isLoading ? "Subscribing..." : "Subscribe to Briefly"}
                        </Button>
                      </motion.div>
                    </form>

                    <div className="pt-6 border-t border-border/50">
                      <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>50+ subscribers</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <span>Free forever</span>
                        <Separator orientation="vertical" className="h-4" />
                        <span>Unsubscribe anytime</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Unsubscribe Tab */}
            <TabsContent value="unsubscribe">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-xl">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">Unsubscribe</CardTitle>
                    <CardDescription>
                      Sorry to see you go! Enter your email to unsubscribe from our Briefly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUnsubscribe} className="space-y-4">
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={unsubscribeEmail}
                          onChange={(e) => setUnsubscribeEmail(e.target.value)}
                          required
                          className="w-full h-12 bg-background/50 border-border/50 focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                        />
                      </motion.div>
                      <motion.div variants={scaleOnHover} whileHover="whileHover" whileTap="whileTap">
                        <Button
                          type="submit"
                          variant="destructive"
                          className="w-full h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                          disabled={isLoading}
                        >
                          {isLoading ? "Unsubscribing..." : "Unsubscribe"}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Admin Tab */}
            <TabsContent value="admin">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-xl">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">Admin Panel</CardTitle>
                    <CardDescription>
                      Enter the secret key to access the admin panel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          type="password"
                          placeholder="Enter admin secret key"
                          value={adminKey}
                          onChange={(e) => setAdminKey(e.target.value)}
                          className="w-full h-12 bg-background/50 border-border/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                        />
                      </motion.div>
                      <motion.div variants={scaleOnHover} whileHover="whileHover" whileTap="whileTap">
                        <Button
                          onClick={handleSendEmails}
                          className="w-full h-12 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                          disabled={isLoading}
                        >
                          {isLoading ? "Verifying Admin Key..." : "Open Admin Panel"}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="container mx-auto px-4 py-12 mt-16 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center text-muted-foreground">
          <motion.p className="mb-2 text-lg" whileHover={{ scale: 1.05 }}>
            © 2024 Briefly. All rights reserved.
          </motion.p>
          <p className="text-sm flex items-center justify-center space-x-2">
            <span>Powered by OpenAI GPT</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Trusted news sources</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Daily delivery</span>
          </p>
        </div>
      </motion.footer>
    </div>
  )
}
