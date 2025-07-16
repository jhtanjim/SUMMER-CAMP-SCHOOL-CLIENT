"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface ClassData {
  id: string
  name: string
  instructor: string
  price: number
  image: string
  rating: number
  students: number
  duration: string
  level: string
  category: string
}

export default function FeaturedClasses() {
  const [classes, setClasses] = useState<ClassData[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulate API call with better mock data
    const mockClasses: ClassData[] = [
      {
        id: "1",
        name: "Piano Fundamentals",
        instructor: "Sarah Johnson",
        price: 89,
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.9,
        students: 1250,
        duration: "8 weeks",
        level: "Beginner",
        category: "Piano",
      },
      {
        id: "2",
        name: "Guitar Mastery",
        instructor: "Mike Rodriguez",
        price: 129,
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.8,
        students: 890,
        duration: "12 weeks",
        level: "Intermediate",
        category: "Guitar",
      },
      {
        id: "3",
        name: "Vocal Training Pro",
        instructor: "Emma Thompson",
        price: 99,
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.9,
        students: 2100,
        duration: "10 weeks",
        level: "All Levels",
        category: "Vocals",
      },
      {
        id: "4",
        name: "Drum Beats & Rhythms",
        instructor: "Alex Chen",
        price: 149,
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.7,
        students: 650,
        duration: "6 weeks",
        level: "Beginner",
        category: "Drums",
      },
    ]

    setTimeout(() => {
      setClasses(mockClasses)
      setLoading(false)
    }, 1000)
  }, [])

  const toggleFavorite = (classId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(classId)) {
        newFavorites.delete(classId)
      } else {
        newFavorites.add(classId)
      }
      return newFavorites
    })
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Featured Classes
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Popular Music Classes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most loved classes taught by industry professionals. Start your musical journey with courses
            designed for every skill level.
          </p>
        </motion.div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(classItem.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.has(classItem.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </button>

                    {/* Level Badge */}
                    <Badge className={`absolute top-4 left-4 ${getLevelColor(classItem.level)}`}>
                      {classItem.level}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                        {classItem.name}
                      </h3>
                      <p className="text-gray-600">by {classItem.instructor}</p>
                    </div>

                    {/* Rating and Students */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{classItem.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{classItem.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{classItem.duration}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">${classItem.price}</span>
                      <Badge variant="outline" className="text-xs">
                        {classItem.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 space-y-3">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group">
                    <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={`/classes/${classItem.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" asChild className="px-8 py-4 bg-transparent">
            <Link href="/classes">View All Classes</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
