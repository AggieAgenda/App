from supabase import create_client
import os
import uuid

supabase = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_ANON_KEY"]
)
def upload_event_image(file):
    filename = f"{uuid.uuid4()}-{file.name}"

    supabase.storage.from_("event_images").upload(
        filename,
        file.read(),
        {"content-type": file.content_type}
    )

    return (
        f"{os.environ['SUPABASE_URL']}"
        f"/storage/v1/object/public/event_images/{filename}"
    )