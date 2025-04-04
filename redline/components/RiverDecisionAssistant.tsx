
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function RiverDecisionAssistant() {
  const [handClass, setHandClass] = useState("");
  const [position, setPosition] = useState("");
  const [boardTexture, setBoardTexture] = useState("");
  const [blockers, setBlockers] = useState("");
  const [opponentType, setOpponentType] = useState("");
  const [stackDepth, setStackDepth] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  const evaluate = () => {
    if (handClass === "Air") {
      if (["scary", "straightening", "flush completing"].includes(boardTexture) && blockers === "nut unblockers") {
        return "Bluff with large size (75-125%)";
      } else if (opponentType === "reg" && position === "IP") {
        return "Consider overbet bluff (125%+)";
      } else {
        return "Likely check-fold";
      }
    }

    if (handClass === "Middling SDV") {
      if (opponentType === "rec" && position === "IP") {
        return "Thin value bet (33-50%)";
      } else if (blockers === "strong" && opponentType !== "station") {
        return "Convert to bluff (50-75%)";
      } else {
        return "Check and evaluate showdown odds";
      }
    }

    if (handClass === "Value") {
      if (opponentType === "rec") {
        return "Bet for thin value (50-75%)";
      } else if (boardTexture === "dry" && stackDepth === "shallow") {
        return "Value bet (66-75%)";
      } else {
        return "Evaluate vs pool tendencies";
      }
    }

    return "Default to check";
  };

  const handleSubmit = () => {
    const result = evaluate();
    setRecommendation(result);
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4 space-y-4">
      <CardContent className="space-y-4">
        <Select onValueChange={setHandClass}>
          <SelectTrigger><SelectValue placeholder="Hand Class" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Air">Air</SelectItem>
            <SelectItem value="Middling SDV">Middling SDV</SelectItem>
            <SelectItem value="Value">Value</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setPosition}>
          <SelectTrigger><SelectValue placeholder="Position" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="IP">In Position</SelectItem>
            <SelectItem value="OOP">Out of Position</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setBoardTexture}>
          <SelectTrigger><SelectValue placeholder="Board Texture" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="dry">Dry</SelectItem>
            <SelectItem value="scary">Scary</SelectItem>
            <SelectItem value="straightening">Straightening</SelectItem>
            <SelectItem value="flush completing">Flush Completing</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setBlockers}>
          <SelectTrigger><SelectValue placeholder="Blocker Quality" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="strong">Strong</SelectItem>
            <SelectItem value="nut unblockers">Nut Unblockers</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setOpponentType}>
          <SelectTrigger><SelectValue placeholder="Opponent Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="rec">Recreational</SelectItem>
            <SelectItem value="reg">Regular</SelectItem>
            <SelectItem value="station">Station</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setStackDepth}>
          <SelectTrigger><SelectValue placeholder="Stack Depth" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="deep">Deep</SelectItem>
            <SelectItem value="shallow">Shallow</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSubmit}>Get Recommendation</Button>

        {recommendation && (
          <div className="text-xl font-bold mt-4">{recommendation}</div>
        )}
      </CardContent>
    </Card>
  );
}
