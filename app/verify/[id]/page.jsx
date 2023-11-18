"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useStore } from "@/store/storeContext"
import { useRouter } from "next/navigation";
import store from "@/store/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "iconoir-react";

export default function Component({ params: { id } }) {

    const store = useStore();

    const router = useRouter();

    const getUpdatedEmailVerificationStatus = async () => {

        try {
            const response = await store.getUpdatedEmailVerificationStatus(id);
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getUpdatedEmailVerificationStatus();
    });


    return (

        <section className="flex flex-col items-center justify-center min-h-screen bg-background text-color p-6">
            <CheckCircle className="w-24 h-24 text-primary opacity-75 hover:-translate-y-3 hover:scale-150 transition ease-in-out" />
            <h2 className="text-3xl font-bold text-center mt-5">Email Verification Successful!</h2>
            <p className="mt-4 text-lg text-center">
                Thank you for verifying your email. You can now enjoy full access to all our features.
            </p>
            <Link href="/home">
            <Button className="mt-6 bg-white text-black" variant="default">
                Go to Home Page
            </Button>
            </Link>
        </section>


    )
}