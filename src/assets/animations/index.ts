// import ListAnimation from "../../components/ListAnimation/ListAnimation";

export const LoadingAnimation = require("./male/loading.json");
export const EmptyListAnimation = require("./male/empty.json");
export const NetErrorAnimation = require("./male/netError.json");

// export const Loading = () => <ListAnimation name={LoadingAnimation} />;
// export const ListEmpty = () => <ListAnimation full title="لیست خالی است" name={EmptyListAnimation} />;
// export const ChatEmpty = () => <ListAnimation full title="گفتگویی ثبت نشده است" name={EmptyListAnimation} />;
// export const NetError = ({ onRefresh }: { onRefresh?: () => void }) => (
//   <ListAnimation onRefresh={onRefresh} full title="خطا در دریافت اطلاعات" name={NetErrorAnimation} />
// );

export default {
  male: {
    loading: require("./male/loading.json"),
    netError: require("./male/netError.json"),
    listEmpty: require("./male/empty.json"),
  },
  female: {
    loading: require("./female/loading.json"),
    netError: require("./female/netError.json"),
    listEmpty: require("./female/empty.json"),
  },
};
