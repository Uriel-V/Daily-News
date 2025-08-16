"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, Globe, Sparkles } from "lucide-react"
import React from "react"

const stats = [
  { icon: Users, value: "50+", label: "Active Subscribers" },
  { icon: TrendingUp, value: "100%", label: "Satisfaction Rate" },
  { icon: Sparkles, value: "500+", label: "Summaries generated" },
  { icon: Globe, value: "11", label: "Trusted Sources" },
]

type StatProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  label: string;
};

function Stat({ icon: Icon, value, label }: StatProps) {
  return (
    <div className="text-center flex-shrink-0 w-48">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export function Marquee({
  speed = 20,
  pauseOnHover = true,
}: {
  speed?: number
  pauseOnHover?: boolean
}) {
  const content = [...stats, ...stats]

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex gap-16 will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        {...(pauseOnHover && {
          whileHover: { animationPlayState: "paused" as React.CSSProperties["animationPlayState"] }
        })}
      >
        {content.map((s, i) => (
          <Stat key={i} icon={s.icon} value={s.value} label={s.label} />
        ))}
      </motion.div>
    </div>
  )
}
