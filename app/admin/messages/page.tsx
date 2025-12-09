"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { Mail, Clock, CheckCircle } from "lucide-react"

export default function MessagesPage() {
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })
        if (data) setMessages(data)
        setLoading(false)
    }

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-foreground mb-8">Messages</h1>

            {loading ? (
                <div className="text-center text-muted-foreground p-8">Loading messages...</div>
            ) : messages.length === 0 ? (
                <div className="text-center text-muted-foreground p-8 bg-card border border-border rounded-xl">
                    No messages received yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-card border border-border p-6 rounded-xl space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold uppercase">
                                        {msg.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{msg.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Mail className="w-3 h-3" />
                                            {msg.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full w-fit">
                                    <Clock className="w-3 h-3" />
                                    {new Date(msg.created_at).toLocaleString()}
                                </div>
                            </div>

                            <div className="bg-muted/50 p-4 rounded-lg text-foreground text-sm whitespace-pre-wrap">
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
