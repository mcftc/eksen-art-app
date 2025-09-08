"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  position?: "left" | "right"
}

export function WhatsAppButton({ 
  phoneNumber = "905301204182", // Replace with your WhatsApp number
  message = "Merhaba, fuar standı hakkında bilgi almak istiyorum.",
  position = "right"
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className={`fixed bottom-6 ${position === "left" ? "left-6" : "right-6"} z-50 rounded-full h-14 w-14 p-0 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="h-6 w-6 text-white fill-white" />
    </Button>
  )
}