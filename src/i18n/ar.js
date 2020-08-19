import arabicMessages from 'ra-language-arabic';

let arMessages = arabicMessages;
arMessages.ra.page.dashboard = 'الرئيسية'
arMessages.ra.action.create = 'إضافة'
export default {
    ...arMessages,
    resources: {
        general: {
            appname: 'Semi-Automated Interface for Content Annotation',
            configuration: 'اللغة',
            language: 'اللغة',
            active: 'فعّال؟',
            search: 'بحث',
            displayOrder: 'الترتيب',
            back: 'السابق',
            next: 'حفظ',
            done: 'إنهاء', 
            name: 'الإسم',
            task: 'المهمة',
            reset: 'إعادة ضبط',
            cancel: 'إلغاء'
        },
        reset:{
            title: 'تهيئة النظام',
            description: "سوف يتم حذف المعلومات بشكل نهائي. لا يمكنك العودة عن هذا القرار.",
            tasks_and_annotations: "المهمات والأجابات",
            categories: "التصنيفات",
            tweets: "التغريدات",
            be_careful: "كن حذرا"
        },
        agreement: {
            name: 'الإتفاق'
        },
        annotations: {
            taskNumber: ' مهمة رقم ',
            text: 'التويت',
            removeDimension: 'إلغاء الإجابة',
            isIrrelevent: 'غير ملائم',
            confidence: 'نسبة التأكد',
            totalAnnotations: 'عدد الإجابات',
            name: 'المهمّات',
            taskDuration: "عدد الثواني",
            monitor: 'تفاصيل المهمات',
            annotationtask: "التوزيع",
            status: 'الحالة',
            startTime: 'البداية',
            finishTime: 'النهاية',
            taskDone: 'إنهاءالمهمة'
        },
        annotationTask: {
            nameItem: 'المهمة',
            tweets: 'التويت',
            name: 'الإسم',
            user: 'الواسم',
            totalTweets: 'عدد التويت',
            doneTweets: 'التويت المنتهية',
            status: 'الحالة',
            startTweetId: 'من تويت',
            endTweetId: 'إلى تويت',
        },
        words: {
            name: 'الكلمات'
        }
        ,
        levelOfConfidence: {
            name: 'نسبة التأكد'
        },
        twitter: {
            tweet: 'التويت',
            name: 'تويتر'
        }
        ,
        category: {
            name: 'الفئات',
            category: 'الفئة',
            color: 'اللون'
        }
        ,
        dimension: {
            nameAr: 'الجواب',
            nameEn: 'الجواب إنكليزي',
            choose: 'إختر جواب',
            name: 'الأجوبة',
            nameitem: 'الجواب',
            add: 'إضافة جواب',
            chooselevel: 'نسبة التأكد'
        }
        ,
        users: {
            statistics: 'الإحصائات',
            user: 'الفرد',
            name: 'الأفراد',
            username: 'الإسم',
            role: 'الوظيفة',
            annotations: 'المهمات',
            avgLevelOfConfidence: 'معدل نسبة التأكد'
        },
        statistics: {
            tweetDone: ' تويت منجزة',
            tweetRemaining: 'تويت متبقية',
            donePercentage: 'النسبة المنجزة',
            workMinutes: 'دقيقة مصروفة',
            averagePerTweet: 'معدل التويت',
            avgLevelOfConfidence: 'معدل نسبة التأكد'
        }
        ,
        reporting: {
            name: 'التقارير'
        },
        status: {
            new: 'جديدة', progress: 'جار العمل', done: 'منتهية'
        }
    },
};