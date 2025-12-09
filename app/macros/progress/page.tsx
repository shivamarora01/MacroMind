import { MacroProgress } from "@/components/MacroProgress";
export default function ExamplePage() {

  return (
    <div className="space-y-6 bg-slate-950 text-white">
      <h1 className="text-xl font-semibold">Progress Bar</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <MacroProgress label="Calories" value={1420} goal={2200} unit="kcal"/>
      <MacroProgress label="Protein" value={45} goal={125} unit="gm" />
      <MacroProgress label="Carbs" value={120} goal={250} />
      <MacroProgress label="Fat" value={45} goal={70} />
      <MacroProgress label="Caffeine" value={90} goal={300} unit="mg"/>
      </div>
    </div>
  );
}
