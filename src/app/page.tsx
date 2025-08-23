import AddButton from "@/components/AddButton";
import Table from "@/components/Table";

export default function Home() {
  return (
    <div className="p-8 flex flex-col gap-4 bg-gradient-to-tl from-[#534435] via-[#6f4e37] to-[#3e2c23] min-h-screen">
      <h1 className="text-4xl mb-4 text-center text-[#f3e1c0] font-sans">Coffkrat</h1>
      <div className="flex justify-end">
        <AddButton />
      </div>
      <Table></Table>
    </div>
  );
}
