import Responsive from "../components/common/Responsive";
import HeaderContainer from "../containers/common/HeaderContainer";
import PostDiary from "../components/write/PostDiary.js";

const WritePage = () => {
    return (
        <Responsive>
            <HeaderContainer />
            <PostDiary />
        </Responsive>
    );
};

export default WritePage;