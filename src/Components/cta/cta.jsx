"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Music, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-bounce delay-100">
          🎵
        </div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse delay-300">
          🎶
        </div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-500">
          🎼
        </div>
        <div className="absolute bottom-10 right-10 text-3xl animate-pulse delay-700">
          🎹
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <Badge
              variant="secondary"
              className="bg-white/10 text-white border-white/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Your Musical Journey Today
            </Badge>

            {/* Heading */}
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Make
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Beautiful Music?
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Join over 15,000 students worldwide and start learning from the
              best instructors. Your musical journey begins with a single note.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg group"
                asChild
              >
                <Link href="/classes">
                  <Music className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Browse Classes
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                asChild
              >
                <Link href="/instructors">Meet Instructors</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-12 text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">15,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">200+ Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm">50+ Instruments</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
