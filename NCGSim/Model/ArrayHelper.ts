    function removeArrayItem<TItemType>(list: TItemType[], item: TItemType) {
        for (var index in list) {
            if (list[index] == item) {
                list.splice(index, 1);
                break;
            }
        }
    }
