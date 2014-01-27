class __ {
    public static removeArrayItem<TItemType>(list: TItemType[], item: TItemType):void {
        for (var index in list) {
            if (list[index] == item) {
                list.splice(index, 1);
                break;
            }
        }
    }

    public static reverse<T>(inArray: T[]): T[] {
        if (inArray == null) return null;
        
        var outArray: T[] = [];
        var index = inArray.length - 1;
        while (index >= 0) {
            outArray.push(inArray[index--]);
        }

        return outArray;
    }

}