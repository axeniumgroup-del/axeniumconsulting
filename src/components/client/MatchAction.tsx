"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { updateMatchStatus } from "@/app/actions/client";
import { useRouter } from "next/navigation";

export function MatchAction({ matchId }: { matchId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async (status: "ACCEPTED" | "REJECTED") => {
    setIsLoading(true);
    try {
      const result = await updateMatchStatus(matchId, status);
      if (!result.success) throw new Error(result.error);
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleStatusUpdate("ACCEPTED")}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
        Accepter
      </Button>
      <Button
        variant="outline"
        onClick={() => handleStatusUpdate("REJECTED")}
        disabled={isLoading}
        className="text-red-600 hover:bg-red-50"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
        Refuser
      </Button>
    </div>
  );
}
