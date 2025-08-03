import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Formula from "../Formula";

type Sex = "male" | "female";
type Activity = "sedentary" | "lightlyActive" | "moderatelyActive" | "veryActive" | "extraActive";

export default function BmrCalculator() {
  const [sex, setSex] = useState<Sex>("female");
  const [age, setAge] = useState<number>(25);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [activity, setActivity] = useState<Activity>("sedentary");

  const bmr = (() => {
    if (sex === "male") {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  })();

  const bmrFormula = (() => {
    if (sex === "male") {
      return `\\text{BMR}_{\\text{male}} = 88.362 + (13.397 \\times \\text{weight}) + (4.799 \\times \\text{height}) - (5.677 \\times \\text{age})`;
    } else {
      return `\\text{BMR}_{\\text{female}} = 447.593 + (9.247 \\times \\text{weight}) + (3.098 \\times \\text{height}) - (4.330 \\times \\text{age})`;
    }
  })();
  const tdeeFormula = (() => {
    return `\\text{TDEE} = \\text{BMR} \\times \\text{PAL}`;
  })();

  const pal = (() => {
    switch (activity) {
      case "sedentary":
        return 1.2;
      case "lightlyActive":
        return 1.375;
      case "moderatelyActive":
        return 1.55;
      case "veryActive":
        return 1.725;
      case "extraActive":
        return 1.9;
    }
  })();

  const tdee = bmr * pal;

  return <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-xl">Basal Metabolic Rate</CardTitle>
      <CardDescription>
        The Modified Harris-Benedict Equation is used to estimate Basal Metabolic Rate (BMR) &mdash; the number of calories your body needs at rest.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-6">
        <Select onValueChange={e => setSex(e as Sex)} value={sex}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid gap-2">
          <Label htmlFor="age">Age</Label>
          <Input type="number" id="age" placeholder="Age" value={age} onChange={e => setAge(Number(e.target.value))} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input type="number" id="weight" placeholder="Weight" value={weight} onChange={e => setWeight(Number(e.target.value))} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input type="number" id="height" placeholder="Height" value={height} onChange={e => setHeight(Number(e.target.value))} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="activity">Activity Level</Label>
          <Select onValueChange={e => setActivity(e as Activity)} value={activity}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {
                [
                  ["sedentary", "Sedentary", "Little or no exercise"],
                  ["lightlyActive", "Lightly Active", "Light exercise 1-3 days/week"],
                  ["moderatelyActive", "Moderately Active", "Moderate exercise 3-5 days/week"],
                  ["veryActive", "Very Active", "Hard exercise 6-7 days/week"],
                  ["extraActive", "Extra Active", "Very hard exercise, physical job"]
                ].map(([value, label, description]) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex flex-col items-start">
                      <p>{label}</p>
                      <p className="text-xs text-slate-500">{description}</p>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
    <Separator />
    <CardFooter>
      <div className="flex flex-col items-start">
        <div className="grid grid-cols-2 gap-4 gap-x-8 items-end">
          <div>
            <p>BMR</p>
            <p className="text-xs text-slate-500">Basal Metabolic Rate</p>
          </div>
          <p className="font-mono">{bmr.toFixed(0)} kcal</p>
          <div>
            <p>PAL</p>
            <p className="text-xs text-slate-500">Physical Activity Level</p>
          </div>
          <p className="font-mono">× {pal}</p>
          <div>
            <p>TDEE</p>
            <p className="text-xs text-slate-500">Total Daily Energy Expenditure</p>
          </div>
          <p className="text-xl font-mono">{tdee.toFixed(0)} kcal</p>
        </div>
      </div>
    </CardFooter>
    <Separator />
    <CardContent>
      <Formula className="text-xs mb-4" latex={bmrFormula} />
      <Formula className="text-xs" latex={tdeeFormula} />
    </CardContent>
  </Card>
}
