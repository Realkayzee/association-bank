import DashboardLayout from "@/components/DashboardLayout";


const sid = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8"
]

const executives = () => {
    return (
        <DashboardLayout>
            <div className="grid grid-cols-3 gap-4">
                {
                    sid.map((item, id) => (
                        <div key={id}>
                            {item}
                        </div>
                    ))
                }
            </div>
        </DashboardLayout>
    );
}

export default executives;