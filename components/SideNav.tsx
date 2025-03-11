import { ModeToggle } from "./ModeToggle";

export default function SideNav() {
  return (
    <div className="flex flex-col h-full px-2 py-4 md:border-l md:border-border border-b md:border-b-0 ">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 justify-center items-center ">
            <h1 className="text-2xl font-bold">Logo</h1>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
