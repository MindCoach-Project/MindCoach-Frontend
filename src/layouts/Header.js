"use client"

import { Logo } from "../components/ui"
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa"
import { useGlobalState } from "../global/state"
import { useEffect, useState } from "react"
import { ensureHttps } from "../utils/ensureHttps"

function Header() {
  const { state } = useGlobalState()
  const [profileImage, setProfileImage] = useState(null)
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/8792/8792047.png"

  const isValidImageUrl = (url) => {
    return url && (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg"))
  }

  useEffect(() => {
    if (state.user && isValidImageUrl(state.user.imageUrl)) {
      setProfileImage(ensureHttps(state.user.imageUrl))
    } else {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        if (userData && isValidImageUrl(userData.imageUrl)) {
          setProfileImage(ensureHttps(userData.imageUrl))
        } else {
          setProfileImage(defaultImage)
        }
      } else {
        setProfileImage(defaultImage)
      }
    }
  }, [state.user])

  return (
    <div className="flex justify-between z-50 mt-12">
      <Link to="/home">
        <Logo width={120} />
      </Link>
      <div className="flex items-center gap-12">
        <Link to="/profile">
          {profileImage ? (
            <img
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-1 border-brown object-cover"
            />
          ) : (
            <FaUser size={24} />
          )}
        </Link>
      </div>
    </div>
  )
}

export default Header

