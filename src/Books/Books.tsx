import {useCallback, useState} from "react";
import {IBook, searchBooks} from "../api/search.api";
import {Box, Button, Card, CardActions, CardContent, Skeleton, TextField, Typography} from "@mui/material";
import {useDebounce} from "react-use";

export function Books() {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState<IBook[]>([]);

    const fetchBooks = useCallback(async (value: string) => {
        setLoading(true);
        const {data} = await searchBooks(value);
        if (data) {
            setBooks(data.docs);
        }
        setLoading(false);
    }, []);

    useDebounce(() => {
        if (search) {
            void fetchBooks(search);
        }
    }, 700, [search]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <TextField value={search} onChange={(evt) => {
                setSearch(evt.target.value);
            }} sx={{width: 300, marginBottom: 4}} label="Search" variant="outlined"/>
            {books.map(b => (
                <Card key={b.key} sx={{width: 300, marginBottom: 2}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            {b.author_name?.[0]}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {b.title}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            Published {b.first_publish_year}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            ))}
            {loading && (
                <Box>
                    <Skeleton sx={{marginBottom: 2}} variant="rectangular" width={300} height={170} />
                    <Skeleton sx={{marginBottom: 2}} variant="rectangular" width={300} height={170} />
                    <Skeleton sx={{marginBottom: 2}} variant="rectangular" width={300} height={170} />
                    <Skeleton sx={{marginBottom: 2}} variant="rectangular" width={300} height={170} />
                </Box>
            )}
        </Box>
    )
}
