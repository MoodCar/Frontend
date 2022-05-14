import AskModal from '../common/AskModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <AskModal
            visible={visible}
            title="일기 삭제"
            description="일기를 정말 삭제하시겠습니까?"
            confirmText="삭제"
            onconfirm={onConfirm}
            onCancel={onCancel}
        />
    );
};

export default AskRemoveModal;