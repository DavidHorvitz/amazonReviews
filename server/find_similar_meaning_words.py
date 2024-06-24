import pandas as pd
from nltk.corpus import wordnet
import nltk

# הורדת משאבים אם לא הורדו בעבר
nltk.download('wordnet')
nltk.download('omw-1.4')

def find_similar_meaning_words_from_file(file_path, word, category=None):
    print("word:", word)
    print("category:", category)
    
    similar_words = set()
    df = pd.read_csv(file_path, usecols=[1, 2], nrows=5000)  # קריאת הקובץ CSV עם Pandas ובחירת עמודות מסוימות
    words_to_search = df.values.tolist()  # המרת העמודות המסוימות לרשימת מילים
    
    for row in words_to_search:
        for word_to_search in row:
            word_to_search = str(word_to_search).strip()
            print(f"Word to search: {word_to_search}, Word: {word}")  # הדפסת המילה שאתה מחפש והמילות בקובץ
            if word_to_search == word:
                synsets = wordnet.synsets(word_to_search, lang='eng')
                for synset in synsets:
                    for lemma in synset.lemmas():
                        for related_form in lemma.derivationally_related_forms():
                            related_synset = related_form.synset()
                            if category is None or category in related_synset.lexname():
                                similar_words.add(related_form.name())
                                print(similar_words)