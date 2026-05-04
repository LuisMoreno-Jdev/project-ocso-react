import deleteEmployee from "@/actions/employees/delete";
import { Button } from "@heroui/react";
import { LuTrash2 } from "react-icons/lu";

export default function DeleteEmployee({ employeeId }: { employeeId: string }) {
    const deleteEmployeeById = deleteEmployee.bind(null, employeeId);
    return (
        <form
        action={deleteEmployeeById}
        >
            <Button variant="danger" type="submit" className="w-[100px] h-10">
                <LuTrash2 size="20" />
            </Button>
        </form>
    )
}