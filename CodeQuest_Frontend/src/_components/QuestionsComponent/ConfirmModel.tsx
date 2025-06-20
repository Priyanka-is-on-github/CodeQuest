import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog'


interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: ()=>void;
}

const ConfirmModal =({children, onConfirm}:ConfirmModalProps)=>{
    return(
        <AlertDialog >
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>

            <AlertDialogContent className='bg-white'>
                <AlertDialogHeader className='text-black'>
                    <AlertDialogTitle >
                        Are you sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className='text-black'>
                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className='bg-black text-white'>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default ConfirmModal;